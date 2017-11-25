import Model from "./Model";
import * as Pixi from "pixi.js";

export default class Ass extends Model {
    constructor(x, y, angle) {
        super();
        this.sprite.x = x;
        this.sprite.y = y;
    }

    _init() {
        this.sprite = new Pixi.Sprite();
        this.textures = {
            up: Pixi.Texture.fromFrame('ass_up'),
            right: Pixi.Texture.fromFrame('ass_right'),
            down: Pixi.Texture.fromFrame('ass_down'),
            left: Pixi.Texture.fromFrame('ass_left'),
        };
        this.sprite.texture = this.textures.up;
    }
}