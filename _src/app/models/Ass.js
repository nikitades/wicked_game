import Model from "./Model";
import * as Pixi from "pixi.js";

export default class Ass extends Model {
    constructor(x, y) {
        super();
        this.sprite.x = x;
        this.sprite.y = y;
    }

    _init() {
        this.textures = {
            ass: Pixi.Texture.fromFrame('ass')
        };
        this.sprite = new Pixi.Container();
        this.background = new Pixi.Sprite();
        this.background.texture = this.textures.ass;
        this.background.rotation = Math.PI * Math.ceil(Math.random() * 4) / 2;
        this.hitzone = new Pixi.Sprite();
        this.hitzone.texture = Pixi.Texture.EMPTY;
        this.sprite.addChild(this.background);
        this.sprite.addChild(this.hitzone);
        this.background.pivot.set(32, 32);
    }

    _onLoop() {
        this.background.rotation += 0.05;
    }
}