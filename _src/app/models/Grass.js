import Model from "./Model";
import * as PIXI from "pixi.js";
import Game from '../core/Game';

export default class Grass extends Model {
    _init() {
        this.sprite = new PIXI.extras.TilingSprite(Game.r.grass.texture, 640, 480);
    }
}