import State from "./State";
import Game from '../core/Game';
import Ass from "../models/Ass";
import Dick from "../models/Dick";
import Clouds from "../models/Clouds";

export default class Play extends State {
    init() {
        Game.stage.addChild((this.clouds = new Clouds()).sprite);
        Game.stage.addChild((this.dick = new Dick()).sprite);
        this.dick.sprite.alpha = 0;
        this.clouds.sprite.alpha = 0;
        for (let i = 1; i < 5; i++) {
            setTimeout((() => {
                console.log(i);
                this.clouds.sprite.alpha = (1 / 5) * (i + 1);
            }).bind(this), Game.speed * 20 * (i + 1));
        }
        setTimeout(() => {
            this.dick.sprite.x = 320;
            this.dick.sprite.y = 240;
            for (let i = 0; i < 8; i++) {
                let x = Math.random() * (640 - 64);
                let y = Math.random() * (480 - 64);
                let angle = Math.floor(Math.random() * 4);
                Game.stage.addChild(new Ass(x, y, angle).sprite)
            }
            this.dick.sprite.alpha = 1;
        }, Game.speed * 120);
    }

    run() {
        this.dick.sprite.x += this.dick.sprite.vx;
        this.dick.sprite.y += this.dick.sprite.vy;
    }
}