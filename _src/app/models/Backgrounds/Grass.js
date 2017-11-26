import Model from "../Model";
import * as PIXI from "pixi.js";
import World from '../../core/World';

export default class Grass extends Model {
    _init() {
        this.sprite = new PIXI.extras.TilingSprite(World.game.r.grass.texture, 640, 480);
    }
}