import { Keyboard } from "./Keyboard";
import { Switch } from "./Keyboard";
import { KeyAction } from "./KeyAction";

export type Chord = {
    input: Switch[]; // switches that must be pressed simultaneously
    output: KeyAction[]; // characters or action codes that output sequentially
}

export class Library {
    keyboard: Keyboard;
    chords: Chord[];

    constructor(keyboard: Keyboard) {
        this.keyboard = keyboard;
        this.chords = [];
    }
}
