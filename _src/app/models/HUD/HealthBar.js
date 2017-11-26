import * as PIXI from "pixi.js";
import World from '../../core/World';
import HUD from "./HUD";

export default class HealthBar extends HUD {
    /** @inherited */
    _init() {
        this.sprite = new PIXI.Container();
        this.bg = new PIXI.Sprite(PIXI.Texture.fromFrame('hbbg'));
        this.points = new PIXI.Sprite(PIXI.Texture.fromFrame('red'));
        this.points.position.set(4, 4);
        this.maxHP = 120;
        this.points.width = this.maxHP;
        this.points.height = 24;
        this.sprite.addChild(this.bg);
        this.sprite.addChild(this.points);
        this.sprite.position.set(World.game.width - 32 - this.sprite.width, 32);
    }

    update(perc) {
        if (perc < 0) this.points.width = 0;
        this.points.width = this.maxHP * (perc / 100);
    }
}