import Model from "./Model";
import * as PIXI from "pixi.js";
import ArrowMovable from "../traits/ArrowMovable";

export default class Cat extends Model {
    _init() {
        this.textures = {
            run: PIXI.Texture.fromFrame('catrun'),
            walk: PIXI.Texture.fromFrame('catwalk'),
        };
        this.sprite = new PIXI.Sprite();
        this.sprite.texture = this.textures.walk;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.x = 1;
        this.direction = -1;
        this._on('up', this.moveUp.bind(this));
        this._on('up_end', this.stopY.bind(this));
        this._on('down', this.moveDown.bind(this));
        this._on('down_end', this.stopY.bind(this));
        this._on('left', this.moveLeft.bind(this));
        this._on('turn_left', this, this.turnLeft.bind(this));
        this._on('left_end', this.stopX.bind(this));
        this._on('right', this.moveRight.bind(this));
        this._on('turn_right', this.turnRight.bind(this));
        this._on('right_end', this.stopX.bind(this));
        this._on('move_start', this.run.bind(this));
        this._on('move_end', this.walk.bind(this));
    }

    /** @private */
    _onLoop() {

    }

    /** @private */
    _handleKeys() {
        ArrowMovable.call(this);
    }

    /** @private */
    moveRight() {
        this.sprite.vx = 5;
        this.turnRight();
    }

    /** @private */
    moveLeft() {
        this.sprite.vx = -5;
        this.turnLeft();
    }

    /** @private */
    turnLeft() {
        this.direction = 1;
        this.sprite.scale.x = 1;
    }

    /** @private */
    turnRight() {
        this.direction = -1;
        this.sprite.scale.x = -1;
    }

    /** @private */
    stopX() {
        this.sprite.vx = 0;
    }

    /** @private */
    moveUp() {
        this.sprite.vy = -5;
    }

    /** @private */
    moveDown() {
        this.sprite.vy = 5;
    }

    /** @private */
    stopY() {
        this.sprite.vy = 0;
    }

    /** @private */
    run() {
        this.sprite.texture = this.textures.run;
    }

    /** @private */
    walk() {
        this.sprite.texture = this.textures.walk;
    }
}