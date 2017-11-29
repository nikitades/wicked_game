import Model from "./Model";
import * as Pixi from "pixi.js";
import World from '../core/World';

export default class Ass extends Model {
    constructor(x, y) {
        super();
        this.sprite.x = x;
        this.sprite.y = y;
    }

    /** @inherited */
    _init() {
        this.textures = {
            ass: Pixi.Texture.fromFrame('ass')
        };

        //props
        this.wasHit = false;
        this.dying = false;

        this.movementTimeouts = [];

        //container
        this.sprite = new Pixi.Container();
        this.sprite.model = this;
        this.sprite.width = 64;
        this.sprite.height = 64;

        //whole ass
        this.background = new Pixi.Sprite();
        this.background.texture = this.textures.ass;
        this.direction = Math.floor(Math.random() * 4);
        this.spriteDirection = this.direction;
        this.sprite.rotation = Math.PI * ((this.direction) / 2);

        //asshole
        this.hitzone = new Pixi.Sprite();
        this.hitzone.width = 16;
        this.hitzone.height = 16;
        this.hitzone.texture = Pixi.Texture.EMPTY;

        //lil'dick
        this.dickHitzone = new Pixi.Sprite();
        this.dickHitzone.width = 16;
        this.dickHitzone.height = 8;
        this.dickHitzone.texture = Pixi.Texture.EMPTY;

        //combining
        this.sprite.addChild(this.background);
        this.sprite.addChild(this.hitzone);
        this.sprite.addChild(this.dickHitzone);

        //positioning
        this.background.position.set(0, 0);
        this.hitzone.position.set(-8, 16);
        this.dickHitzone.position.set(-8, -28);
        this.background.pivot.set(32, 32);
    }

    behave() {
        let delta = Math.random() > 0.5 ? 1 : -1;
        this.rotate(delta);

        let newX = Math.floor(Math.random() * 100) - 50;
        let newY = Math.floor(Math.random() * 100) - 50;
        if (this.sprite.x + newX < 32) newX = 0;
        if (this.sprite.y + newY < 32) newY = 0;
        if (this.sprite.x + newX + 32 > World.game.width) newX = 0;
        if (this.sprite.y + newY + 32 > World.game.height) newY = 0;
        this.jumpTo(newX, newY);
    }

    getRefreshTime() {
        return World.game.speed * (75 * (1 / World.game.difficulty));
    }

    /** @inherited */
    _onLoop() {
        let curDate = new Date();
        if (!this.lastBehaviour || this.lastBehaviour < (curDate - this.getRefreshTime())) {
            this.lastBehaviour = curDate;
            this.behave();
        }
    }

    die() {
        if (this.dying) return;
        this.dying = true;
        this.onloopClear();
        let steps = 3;
        for (let i = 0; i < steps; i++) {
            setTimeout(function () {
                this.sprite.alpha = 1 - ((i) / steps);
            }.bind(this), World.game.speed * i * 10);
        }
        setTimeout(function () {
            World.game.stage.removeChild(this.sprite);
        }.bind(this), World.game.speed * 10 * steps);
    }

    rotate(delta) {
        let steps = 20;
        for (let i in this.movementTimeouts) {
            clearTimeout(this.movementTimeouts[i]);
        }
        for (let i = 0; i < steps; i++) {
            this.movementTimeouts.push(setTimeout(function () {
                this.spriteDirection = this.direction + i / steps * delta;
                this.sprite.rotation = Math.PI / 2 * this.spriteDirection;
            }.bind(this), ((this.getRefreshTime() - World.game.speed) / steps) * i));
        }
        this.movementTimeouts.push(setTimeout(function () {
            let nd = this.direction + delta;
            if (nd < 0) nd = 3;
            if (nd > 3) nd = 0;
            this.direction = nd;
        }.bind(this), this.getRefreshTime() - World.game.speed));
    }

    jumpTo(newX, newY) {
        let steps = 20;
        for (let i = 0; i < steps; i++) {
            setTimeout(function () {
                this.sprite.position.x += (newX / steps);
                this.sprite.position.y += (newY / steps);
            }.bind(this), this.getRefreshTime() / steps * i);
        }
    }
}