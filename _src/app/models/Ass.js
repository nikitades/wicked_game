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

        //container
        this.sprite = new Pixi.Container();
        this.sprite.model = this;
        this.sprite.width = 64;
        this.sprite.height = 64;

        //whole ass
        this.background = new Pixi.Sprite();
        this.background.texture = this.textures.ass;
        this.sprite.rotation = Math.PI * Math.ceil(Math.random() * 4) / 2;

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

    /** @inherited */
    _onLoop() {
        // this.sprite.rotation += 0.05;
    }

    die() {
        if (this.dying) return;
        this.dying = true;
        let steps = 3;
        for (let i = 0; i < steps; i++) {
            setTimeout(function () {
                this.sprite.alpha = 1 - ((i) / steps);
            }.bind(this), World.game.speed * i * 10);
        }
        setTimeout(function () {
            console.log('removed');
            World.game.stage.removeChild(this.sprite);
        }.bind(this), World.game.speed * 10 * steps);
    }
}