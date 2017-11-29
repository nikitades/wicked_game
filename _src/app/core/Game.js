import * as PIXI from "pixi.js";
import Key from "./Key";
import World from "./World";

export default class Game {
    constructor() {
        this.width = 640;
        this.height = 480;
        this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
        this.stage = new PIXI.Container();
        document.getElementById('screen').appendChild(this.renderer.view);
        this.renderer.render(this.stage);
        this.cache = PIXI.utils.TextureCache;
        this.r = PIXI.loader.resources;
        this.onloop = {};
        this.difficulty = 1; //1, 2, 3
        this.speed = 25; //25 is ok
        this.speed = this.speed * (1 + this.difficulty / 5);
        this.cacheTextures().then(this.loop.bind(this));
    }

    cacheTextures() {
        return new Promise(function (res, rej) {
            try {
                PIXI.loader
                    .add([
                        {name: 'clouds', url: './sprites/clouds.png'},
                        {name: 'menu_bg', url: './sprites/menu_bg.jpg'},
                        {name: 'dick', url: './sprites/piskel_up.png'},
                        {name: 'ass', url: './sprites/ass_up.png'},
                        {name: 'red', url: './sprites/red.png'},
                        {name: 'hbbg', url: './sprites/healthbar_bg.png'},
                    ])
                    .load(res)
            } catch (e) {
                rej(e);
            }
        });
    }

    loop() {
        if (this.state) {
            if (!this.state.inited) {
                this.state.init();
                this.state.inited = true;
            }
            this.state.run();
        }
        for (let i in this.onloop) {
            let f = this.onloop[i];
            if (typeof f === 'function') f();
        }
        this.renderer.render(this.stage);
        requestAnimationFrame(this.loop.bind(this));
    }
}