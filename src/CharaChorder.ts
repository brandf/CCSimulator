import {Keyboard} from './Keyboard';
import {Layout} from './Layout';
import {Library} from './Library';

export class CharaChorder {
    keyboard: Keyboard;
    layout: Layout;
    library: Library;

    constructor() {
        this.keyboard = new Keyboard();
        this.layout = new Layout(this.keyboard);
        this.library = new Library(this.keyboard);
    }
}
