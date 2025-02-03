import { Keyboard, Switch } from './Keyboard';
import { KeyAction, keyActionToCode, keyActionFromCode} from "./KeyAction";

export type LayoutCell = {
    layer: Layer;
    switchLocation: number;
    switch: Switch;
    action: KeyAction;
}

export class Layout {
    keyboard: Keyboard;
    layers: Layer[]; // 3 layers, 0 is the base layer, 1 is the num layer, 2 is the function layer

    constructor(keyboard: Keyboard) {
        this.keyboard = keyboard;
        this.layers = [new Layer(keyboard, 0), new Layer(keyboard, 1), new Layer(keyboard, 2)];
    }

    find(action: KeyAction): LayoutCell | undefined {
        for (let i = 0; i < this.layers.length; i++) {
            let j = 0;
            for (const [switch_, keyAction] of this.layers[i].actions.entries()) {
                if (keyAction === action) {
                    return {
                        layer: this.layers[i],
                        switchLocation: j,
                        switch: switch_,
                        action: action,
                    }
                }
                j++;
            }
        }
    }

    fromJson(json: any) {
        if (json.layers && json.layers.length === 3) {
            for (let i = 0; i < 3; i++) {
                let actions = this.layers[i].actions;
                let j = 0;
                // actions.keys are the switches in the correct location order
                for (const s of actions.keys()) {
                    j++;
                    actions.set(s, keyActionFromCode(json.layers[i][j]));
                };
            }
        }
    }

    toJson() {
        return {
            layers: this.layers.map(layer => Array.from(layer.actions.values()).map(action => keyActionToCode(action))),
        };
    }
}

export class Layer {
    layerNumber: number;
    keyboard: Keyboard;
    actions: Map<Switch, KeyAction>;

    constructor(keyboard: Keyboard, layerNumber: number) {
        this.layerNumber = layerNumber;
        this.keyboard = keyboard;

        // the order matters, should match Switch Location Map from https://docs.charachorder.com/SerialAPI.html#action-codes
        this.actions = new Map<Switch, KeyAction>([
            [keyboard.getSwitch('LT3Z'), KeyAction.None],
            [keyboard.getSwitch('LT3I'), KeyAction.None],
            [keyboard.getSwitch('LT3U'), KeyAction.None],
            [keyboard.getSwitch('LT3O'), KeyAction.None],
            [keyboard.getSwitch('LT3D'), KeyAction.None],

            [keyboard.getSwitch('LT2Z'), KeyAction.None],
            [keyboard.getSwitch('LT2I'), KeyAction.None],
            [keyboard.getSwitch('LT2U'), KeyAction.None],
            [keyboard.getSwitch('LT2O'), KeyAction.None],
            [keyboard.getSwitch('LT2D'), KeyAction.None],

            [keyboard.getSwitch('LTZ'), KeyAction.None],
            [keyboard.getSwitch('LTI'), KeyAction.None],
            [keyboard.getSwitch('LTU'), KeyAction.None],
            [keyboard.getSwitch('LTO'), KeyAction.None],
            [keyboard.getSwitch('LTD'), KeyAction.None],

            [keyboard.getSwitch('LIZ'), KeyAction.None],
            [keyboard.getSwitch('LII'), KeyAction.None],
            [keyboard.getSwitch('LIU'), KeyAction.None],
            [keyboard.getSwitch('LIO'), KeyAction.None],
            [keyboard.getSwitch('LID'), KeyAction.None],

            [keyboard.getSwitch('LMZ'), KeyAction.None],
            [keyboard.getSwitch('LMI'), KeyAction.None],
            [keyboard.getSwitch('LMU'), KeyAction.None],
            [keyboard.getSwitch('LMO'), KeyAction.None],
            [keyboard.getSwitch('LMD'), KeyAction.None],

            [keyboard.getSwitch('LRZ'), KeyAction.None],
            [keyboard.getSwitch('LRI'), KeyAction.None],
            [keyboard.getSwitch('LRU'), KeyAction.None],
            [keyboard.getSwitch('LRO'), KeyAction.None],
            [keyboard.getSwitch('LRD'), KeyAction.None],

            [keyboard.getSwitch('LPZ'), KeyAction.None],
            [keyboard.getSwitch('LPI'), KeyAction.None],
            [keyboard.getSwitch('LPU'), KeyAction.None],
            [keyboard.getSwitch('LPO'), KeyAction.None],
            [keyboard.getSwitch('LPD'), KeyAction.None],

            [keyboard.getSwitch('LM2Z'), KeyAction.None],
            [keyboard.getSwitch('LM2I'), KeyAction.None],
            [keyboard.getSwitch('LM2U'), KeyAction.None],
            [keyboard.getSwitch('LM2O'), KeyAction.None],
            [keyboard.getSwitch('LM2D'), KeyAction.None],

            [keyboard.getSwitch('LR2Z'), KeyAction.None],
            [keyboard.getSwitch('LR2I'), KeyAction.None],
            [keyboard.getSwitch('LR2U'), KeyAction.None],
            [keyboard.getSwitch('LR2O'), KeyAction.None],
            [keyboard.getSwitch('LR2D'), KeyAction.None],

            [keyboard.getSwitch('RT3Z'), KeyAction.None],
            [keyboard.getSwitch('RT3O'), KeyAction.None],
            [keyboard.getSwitch('RT3U'), KeyAction.None],
            [keyboard.getSwitch('RT3I'), KeyAction.None],
            [keyboard.getSwitch('RT3D'), KeyAction.None],

            [keyboard.getSwitch('RT2Z'), KeyAction.None],
            [keyboard.getSwitch('RT2O'), KeyAction.None],
            [keyboard.getSwitch('RT2U'), KeyAction.None],
            [keyboard.getSwitch('RT2I'), KeyAction.None],
            [keyboard.getSwitch('RT2D'), KeyAction.None],

            [keyboard.getSwitch('RTZ'), KeyAction.None],
            [keyboard.getSwitch('RTO'), KeyAction.None],
            [keyboard.getSwitch('RTU'), KeyAction.None],
            [keyboard.getSwitch('RTI'), KeyAction.None],
            [keyboard.getSwitch('RTD'), KeyAction.None],

            [keyboard.getSwitch('RIZ'), KeyAction.None],
            [keyboard.getSwitch('RIO'), KeyAction.None],
            [keyboard.getSwitch('RIU'), KeyAction.None],
            [keyboard.getSwitch('RII'), KeyAction.None],
            [keyboard.getSwitch('RID'), KeyAction.None],

            [keyboard.getSwitch('RMZ'), KeyAction.None],
            [keyboard.getSwitch('RMO'), KeyAction.None],
            [keyboard.getSwitch('RMU'), KeyAction.None],
            [keyboard.getSwitch('RMI'), KeyAction.None],
            [keyboard.getSwitch('RMD'), KeyAction.None],

            [keyboard.getSwitch('RRZ'), KeyAction.None],
            [keyboard.getSwitch('RRO'), KeyAction.None],
            [keyboard.getSwitch('RRU'), KeyAction.None],
            [keyboard.getSwitch('RRI'), KeyAction.None],
            [keyboard.getSwitch('RRD'), KeyAction.None],

            [keyboard.getSwitch('RPZ'), KeyAction.None],
            [keyboard.getSwitch('RPO'), KeyAction.None],
            [keyboard.getSwitch('RPU'), KeyAction.None],
            [keyboard.getSwitch('RPI'), KeyAction.None],
            [keyboard.getSwitch('RPD'), KeyAction.None],

            [keyboard.getSwitch('RM2Z'), KeyAction.None],
            [keyboard.getSwitch('RM2O'), KeyAction.None],
            [keyboard.getSwitch('RM2U'), KeyAction.None],
            [keyboard.getSwitch('RM2I'), KeyAction.None],
            [keyboard.getSwitch('RM2D'), KeyAction.None],

            [keyboard.getSwitch('RR2Z'), KeyAction.None],
            [keyboard.getSwitch('RR2O'), KeyAction.None],
            [keyboard.getSwitch('RR2U'), KeyAction.None],
            [keyboard.getSwitch('RR2I'), KeyAction.None],
            [keyboard.getSwitch('RR2D'), KeyAction.None],
        ]);
    }
}
