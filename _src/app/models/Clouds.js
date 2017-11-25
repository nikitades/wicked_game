import Model from "./Model";
import * as PIXI from "pixi.js";
import Game from '../core/Game';

export default class Clouds extends Model {
    _init() {
        this.sprite = new PIXI.extras.TilingSprite(Game.r.clouds.texture, 640, 480);
    }
}