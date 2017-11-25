import Model from "./Model";
import Game from "../core/Game";
import * as PIXI from "pixi.js";
import ArrowMovable from "../traits/ArrowMovable";

export default class Dick extends Model {
    _init() {
        this.textures = {
            dick_up: PIXI.Texture.fromFrame('dick_up'),
            dick_down: PIXI.Texture.fromFrame('dick_down'),
            dick_left: PIXI.Texture.fromFrame('dick_left'),
            dick_right: PIXI.Texture.fromFrame('dick_right'),
        };
        this.sprite = new PIXI.Sprite();
        this.sprite.texture = this.textures.dick_up;
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
        this._on('move_end', this.stop.bind(this));
        Game.onloop.push(this._onLoop.bind(this));
    }

    _handleKeys() {
        ArrowMovable.call(this);
    }

    _onLoop() {

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
    stopX() {
        this.sprite.vx = 0;
    }

    /** @private */
    moveUp() {
        this.sprite.vy = -5;
        this.turnUp();
    }

    /** @private */
    moveDown() {
        this.sprite.vy = 5;
        this.turnDown();
    }

    /** @private */
    stopY() {
        this.sprite.vy = 0;
    }

    /** @private */
    turnLeft() {
        this.sprite.texture = this.textures.dick_left;
    }

    /** @private */
    turnRight() {
        this.sprite.texture = this.textures.dick_right;
    }

    /** @private */
    turnUp() {
        this.sprite.texture = this.textures.dick_up;
    }

    /** @private */
    turnDown() {
        this.sprite.texture = this.textures.dick_down;
    }

    /** @private */
    run() {
        // this.sprite.texture = this.textures.dick_up;
    }

    /** @private */
    stop() {
        // this.sprite.texture = this.textures.dick;
    }
}