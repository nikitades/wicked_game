import Model from "./Model";
import World from "../core/World";
import * as PIXI from "pixi.js";
import ArrowMovable from "../traits/ArrowMovable";
import Strafeable from "../traits/Strafeable";
import EventDriveable from "../traits/EventDriveable";

export default class Dick extends Model {
    /** @inherited */
    _init() {
        this.textures = {
            dick: PIXI.Texture.fromFrame('dick')
        };

        this.manageSprites();
        this.manageEvents();
        this.strafeBack = Strafeable.bind(this);

        this.direction = 0;
        this.maxHP = 100000;
        this.hp = this.maxHP;
        this.maxSpeed = 3;
        this.disabled = false;
        window.d = this;
    }

    manageEvents() {
        EventDriveable.call(this);
    }

    manageSprites() {
        this.sprite = new PIXI.Container();
        this.sprite.pivot.set(16, 16);
        this.dick = new PIXI.Sprite(this.textures.dick);
        this.hitzone = new PIXI.Sprite(PIXI.Texture.EMPTY);
        this.hitzone.width = 16;
        this.hitzone.height = 8;
        this.hitzone.position.set(8, 0);
        this.sprite.addChild(this.dick);
        this.sprite.addChild(this.hitzone);
    }

    /** @inherited */
    _handleKeys() {
        ArrowMovable.call(this);
    }

    /** @inherited */
    _onLoop() {

    }

    /** @private */
    moveRight() {
        if (this.disabled) return this.stopX();
        this.turnRight();
        if (this.sprite.position.x + 16 > World.game.width) {
            this.sprite.position.x = World.game.width - 16;
            this.stopX();
        } else this.sprite.vx = this.maxSpeed;
    }

    /** @private */
    moveLeft() {
        if (this.disabled) return this.stopX();
        this.turnLeft();
        if (this.sprite.position.x - 16 < 0) {
            this.sprite.position.x = 0;
            this.stopX();
        } else this.sprite.vx = -this.maxSpeed;
    }

    /** @private */
    stopX() {
        this.sprite.vx = 0;
    }

    /** @private */
    moveUp() {
        if (this.disabled) return this.stopY();
        this.turnUp();
        if (this.sprite.position.y - 16 < 0) {
            this.sprite.position.y = 0;
            this.stopY();
        } else this.sprite.vy = -this.maxSpeed;
    }

    /** @private */
    moveDown() {
        if (this.disabled) return this.stopY();
        this.turnDown();
        if (this.sprite.position.y + 16 > World.game.height) {
            this.sprite.position.y = World.game.height - 16;
            this.stopY();
        } else this.sprite.vy = this.maxSpeed;
    }

    /** @private */
    stopY() {
        this.sprite.vy = 0;
    }

    /** @private */
    turnLeft() {
        this.direction = 3;
        this.sprite.rotation = Math.PI * 1.5;
    }

    /** @private */
    turnRight() {
        this.direction = 1;
        this.sprite.rotation = Math.PI * 0.5;
    }

    /** @private */
    turnUp() {
        this.direction = 0;
        this.sprite.rotation = 0;
    }

    /** @private */
    turnDown() {
        this.direction = 2;
        this.sprite.rotation = Math.PI;
    }

    /** @private */
    run() {
        // this.sprite.texture = this.textures.dick_up;
    }

    /** @private */
    stop() {
        // this.sprite.texture = this.textures.dick;
    }

    suffer() {
        this.hp -= 34;
        World.game.state.healthbar.update(this.hp);
        this.strafeBack();
        if (this.hp < 0) this.die();
    }

    die() {
        World.game.state.lose();
    }
}