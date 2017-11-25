import * as PIXI from "pixi.js";
import Key from "./Key";

export default class Game {
    constructor() {
        this.renderer = PIXI.autoDetectRenderer(640, 480);
        this.stage = Game.stage = new PIXI.Container();
        document.getElementById('screen').appendChild(this.renderer.view);
        this.renderer.render(this.stage);
        Game.cache = PIXI.utils.TextureCache;
        Game.r = PIXI.loader.resources;
        Game.onloop = [];
        Game.speed = 1;
        this.cacheTextures().then(this.loop.bind(this));
    }

    cacheTextures() {
        return new Promise(function (res, rej) {
            try {
                PIXI.loader
                    .add([
                        {name: 'clouds', url: './sprites/clouds.png'},
                        {name: 'dick_up', url: './sprites/piskel_up.png'},
                        {name: 'dick_down', url: './sprites/piskel_down.png'},
                        {name: 'dick_left', url: './sprites/piskel_left.png'},
                        {name: 'dick_right', url: './sprites/piskel_right.png'},
                        {name: 'ass_up', url: './sprites/ass_up.png'},
                        {name: 'ass_down', url: './sprites/ass_down.png'},
                        {name: 'ass_left', url: './sprites/ass_left.png'},
                        {name: 'ass_right', url: './sprites/ass_right.png'},
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
        for (let i in Game.onloop) {
            let f = Game.onloop[i];
            if (typeof f === 'function') f();
        }
        this.renderer.render(this.stage);
        requestAnimationFrame(this.loop.bind(this));
    }
}