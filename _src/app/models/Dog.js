import Model from "./Model";
import * as Pixi from "pixi.js";
import World from '../core/World';

export default class Dog extends Model {
    constructor(x, y) {
        super();
        this.sprite.x = x;
        this.sprite.y = y;
    }
    _init() {
        this.sprite = new Pixi.Sprite(World.game.r.dog.texture);
        this.sprite.width = 100;
        this.sprite.height = 60;
    }
}