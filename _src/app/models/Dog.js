import Model from "./Model";
import * as Pixi from "pixi.js";
import Game from '../core/Game';

export default class Dog extends Model {
    constructor(x, y) {
        super();
        this.sprite.x = x;
        this.sprite.y = y;
    }
    _init() {
        this.sprite = new Pixi.Sprite(Game.r.dog.texture);
        this.sprite.width = 100;
        this.sprite.height = 60;
    }
}