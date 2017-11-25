import State from "./State";
import Game from '../core/Game';
import Ass from "../models/Ass";
import Dick from "../models/Dick";
import Clouds from "../models/Clouds";

export default class Play extends State {
    init() {
        Game.stage.addChild((this.clouds = new Clouds()).sprite);
        this.clouds.sprite.alpha = 0;
        for (let i = 1; i < 5; i++) {
            setTimeout((() => {
                console.log(i);
                this.clouds.sprite.alpha = (1 / 5) * (i + 1);
            }).bind(this), Game.speed * 20 * (i + 1));
        }
        setTimeout(() => {
            for (let i = 0; i < 8; i++) {
                let x = Math.random() * (640 - 64) + 32;
                let y = Math.random() * (480 - 64) + 32;
                console.log(x, y);
                Game.stage.addChild(new Ass(x, y).sprite)
            }
            Game.stage.addChild((this.dick = new Dick()).sprite);
            this.dick.sprite.x = 320;
            this.dick.sprite.y = 240;
            this.dick.sprite.alpha = 1;
            this.run = (() => {
                this.dick.sprite.x += this.dick.sprite.vx;
                this.dick.sprite.y += this.dick.sprite.vy;
            }).bind(this);
        }, Game.speed * 120);
    }

    run() {

    }
}