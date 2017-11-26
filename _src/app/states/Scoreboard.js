import State from "./State";
import World from '../core/World';
import Clouds2 from "../models/Backgrounds/Clouds2";

export default class Scoreboard extends State {
    constructor(win, byTimeout) {
        super(win);
        this.win = win;
        this.byTimeout = byTimeout;
    }

    init() {
        World.game.stage.addChild((this.clouds = new Clouds2()).sprite);
        this.clouds.sprite.alpha = 0;
        let steps = 4;
        for (let i = 0; i < steps; i++) {
            setTimeout(function () {
                this.clouds.sprite.alpha += 0.05;
            }.bind(this), (i + 1) * World.game.speed * 20);
        }
        setTimeout(function () {
            World.game.stage.addChild(this.congrats);
            World.game.stage.addChild(this.score);
        }.bind(this), World.game.speed * 20 * 4);

        //конец игры
        this.congrats = new PIXI.Text('Конец игры', {
            fontFamily: 'Monospaced, Source code pro, Consolas, Inconsolata, Courier New',
            fontSize: 32,
            fill: 0xe079ac,
            stroke: 0xebadd6,
            strokeThickness: 2,
            dropShadow: true,
            dropShadowBlur: 16,
            dropShadowColor: 0x806199,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 8,
        });
        this.congrats.position.set(
            World.game.width / 2 - this.congrats.width / 2,
            32
        );

        //счет
        this.score = new PIXI.Text('Ваш счет: ' + World.game.score + "\nВремя: " + (new Date() - World.game.startTime) / 1000 + " секунд" + (this.byTimeout ? "\nИстекло время!" : ""), {
            fontFamily: 'Monospaced, Source code pro, Consolas, Inconsolata, Courier New',
            fontSize: 24,
            fill: 0xe079ac,
            stroke: 0xebadd6,
            strokeThickness: 2,
            dropShadow: true,
            dropShadowBlur: 2,
            dropShadowColor: 0x806199,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 1,
        });
        this.score.position.set(
            World.game.width / 2 - this.score.width / 2,
            100
        );
    }
}