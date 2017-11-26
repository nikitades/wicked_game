import Model from "../Model";
import * as PIXI from "pixi.js";
import World from '../../core/World';

export default class Clouds extends Model {
    _init() {
        this.sprite = new PIXI.extras.TilingSprite(World.game.r.clouds.texture, 640, 480);
    }
}