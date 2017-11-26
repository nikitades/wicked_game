import Model from "../Model";
import * as PIXI from "pixi.js";
import World from '../../core/World';

export default class Clouds2 extends Model {
    _init() {
        this.sprite = new PIXI.extras.TilingSprite(World.game.r.menu_bg.texture, 640, 480);
    }
}