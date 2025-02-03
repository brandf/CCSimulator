import { CharaChorder } from "./CharaChorder";
import { KeyAction, keyActionFromChar } from "./KeyAction";
import { Direction, Switch, Stick } from "./Keyboard";

export class LogicalState {
    layer: number = 0;
    shift: boolean = false;
    alt: boolean = false;
    ctrl: boolean = false;
    gui: boolean = false;
}

export class KeyboardState {
    physical: Map<Switch, Direction> = new Map<Switch, Direction>();
    logical: LogicalState = new LogicalState();
}

export type StickState = Direction | undefined;

export class StickAction {
    stick!: Stick;
    state: StickState;
}

export type SimulatorOutput = { text?: string, error?: string, stickActions: StickAction[], state: KeyboardState}

export class Simulator {
    charaChorder: CharaChorder;

    constructor(charaChorder: CharaChorder) {
        this.charaChorder = charaChorder;
    }

    simulate(text: string): SimulatorOutput {
        let state = new KeyboardState();
        let outputText = "";
        const stickActions: StickAction[] = [];
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const output = this.inputChar(state, char);
            if (output.error) {
                console.log(output.error);
                break;
            }

            if (output.text) {
                // todo handle special characters
                outputText += output.text;
            }

            state = output.state;
            stickActions.push(...output.stickActions);
        }
        return { text: outputText, stickActions: stickActions, state: state };
    }

    inputChar(state: KeyboardState, char: string): SimulatorOutput {
        // todo handle special characters and shifted characters
        const action = keyActionFromChar(char);
        if (!action) {
            return { text: undefined, error: `No action for char ${char}`, stickActions: [], state: state };
        }
        return this.inputAction(state, action);
    }

    inputAction(state: KeyboardState, action: KeyAction): SimulatorOutput {
        // todo: handle multiple switches with the same action
        var layoutCell = this.charaChorder.layout.find(action);
        if (!layoutCell) {
            return { text: undefined, error: `No layout cell found for action ${action}`, stickActions: [], state: state };
        }

        if (state.logical.layer == layoutCell.layer.layerNumber)
        {
            return this.inputStickActions(state, [
                { stick: layoutCell.switch.stick, state: layoutCell.switch.direction },
                { stick: layoutCell.switch.stick, state: undefined },
            ]);
        }
        else
        {
            return { text: undefined, error: `Multiple layers is WIP ${layoutCell.layer.layerNumber}`, switchActions: [], state: state };
        }
    }

    inputStickActions(state: KeyboardState, stickActions: StickAction[]) : SimulatorOutput
    {
        var outputActions: StickAction[] = [];
        var outputText: "";
        stickActions.forEach(action => {
            var output = this.inputStickAction(state, action);
            if (output.error)
                return output;
            completeActions
        });
        return { state}
    }

    
    inputStickAction(state: KeyboardState, stickAction: StickAction) : SimulatorOutput
    {

    }
}
