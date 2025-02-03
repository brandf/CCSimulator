export enum HandId {
    Left = 'L',
    Right = 'R',
}

export enum StickId {
    Thumb = 'T',
    Index = 'I',
    Middle = 'M',
    Ring = 'R',
    Pinky = 'P',
    Thumb2 = 'T2',
    Middle2 = 'M2',
    Ring2 = 'R2',
    Thumb3 = 'T3',
}

export enum Direction {
    Up = 'U',
    Down = 'D',
    In = 'I',
    Out = 'O',
    Press = 'Z',
}

export class Keyboard {
    hands!: {[key in HandId]: Hand;};

    constructor()
    {
        this.hands = {
            L: new Hand(this, HandId.Left),
            R: new Hand(this, HandId.Right),
        }
    }

    getSwitch(key: string): Switch {
        if (key.length !== 3 && key.length !== 4) throw new Error(`Invalid key length. Expected 3 or 4, got ${key.length}`);

        const handId = key[0] as HandId;
        const hand = this.hands[handId];

        if (!hand) throw new Error(`Hand not found for id ${handId}`);
        return hand.getSwitch(key.slice(1));
    }
}

export class Hand {
    keyboard: Keyboard;
    handId: HandId;
    sticks: { [key in StickId]: Stick };

    constructor(keyboard: Keyboard, handId: HandId) {
        this.keyboard = keyboard;
        this.handId = handId;
        this.sticks = {
            T: new Stick(this, StickId.Thumb),
            I: new Stick(this, StickId.Index),
            M: new Stick(this, StickId.Middle),
            R: new Stick(this, StickId.Ring),
            P: new Stick(this, StickId.Pinky),
            T2: new Stick(this, StickId.Thumb2),
            M2: new Stick(this, StickId.Middle2),
            R2: new Stick(this, StickId.Ring2),
            T3: new Stick(this, StickId.Thumb3),
        }
    }

    getSwitch(key: string): Switch {
        let stickId = key[0];
        let directionIndex = 1;

        // If the next character is a number, include it in the stick ID
        if (!isNaN(Number(key[1]))) {
          stickId += key[1];
          directionIndex++;
        }

        const stick = this.sticks[stickId as StickId];
        if (!stick) throw new Error(`Stick not found for id ${stickId}`);
        return stick.getSwitch(key[directionIndex]);
    }

    toString(): string {
        return `${this.handId}`;
    }
}

export class Stick {
    hand: Hand;
    stickId: StickId;
    switches: { [key in Direction]: Switch };

    constructor(hand: Hand, stickId: StickId) {
        this.hand = hand;
        this.stickId = stickId;
        this.switches = {
            U: new Switch(this, Direction.Up),
            D: new Switch(this, Direction.Down),
            I: new Switch(this, Direction.In),
            O: new Switch(this, Direction.Out),
            Z: new Switch(this, Direction.Press),
        }
    }

    getSwitch(key: string): Switch  {
        const s = this.switches[key as Direction];
        if (!s) throw new Error(`Switch not found for direction ${key}`);
        return s;
    }
    toString(): string {
        return `${this.hand}${this.stickId}`;
    }
}

export class Switch {
    stick: Stick;
    direction: Direction;

    constructor(stick: Stick, direction: Direction) {
        this.stick = stick;
        this.direction = direction;
    }

    toString(): string {
        return `${this.stick}${this.direction}`;
    }
}
