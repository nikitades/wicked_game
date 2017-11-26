import * as PIXI from 'pixi.js';
import World from '../../core/World';

export default class MenuButton {
    constructor(text, resolve) {
        this.resolve = resolve || function () {};
        this.selected = false;
        this.sprite = new PIXI.Container();
        this.bg = new PIXI.Sprite(PIXI.Texture.EMPTY);
        this.bg.height = 32;
        this.bg.width = 128;
        this.sprite.addChild(this.bg);
        this.sprite.height = 32;

        this.label = new PIXI.Text(text, {
            fontFamily: 'Monospaced, Source code pro, Consolas, Inconsolata, Courier New',
            fontSize: 20,
            fill: 0xe079ac
        });
        this.label.anchor.set(0.5, 0.5);
        this.label.position.set(this.sprite.width / 2, this.sprite.height / 2);
        this.sprite.addChild(this.label);
        this.sprite.position.x = World.game.width / 2 - this.sprite.width / 2;
    }

    isSelected() {
        return this.selected;
    }

    select() {
        this.bg.texture = PIXI.Texture.fromFrame('red');
        this.label.style.fill = 'white';
        this.selected = true;
    }

    unselect() {
        this.bg.texture = PIXI.Texture.EMPTY;
        this.label.style.fill = 0xe079ac;
        this.selected = false;
    }
}