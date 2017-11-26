import State from "./State";
import World from '../core/World';
import * as PIXI from 'pixi.js';
import MenuButton from "../models/HUD/MenuButton";
import Clouds2 from "../models/Backgrounds/Clouds2";
import ArrowMovable from "../traits/ArrowMovable";
import Key from "../core/Key";
import Play from "./Play";

export default class Menu extends State {
    init() {
        World.game.stage.addChild((this.clouds = new Clouds2()).sprite);
        this.greeting = new PIXI.Text('Анальная фиксация', {
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
        this.greeting.position.set(
            World.game.width / 2 - this.greeting.width / 2,
            32
        );
        World.game.stage.addChild(this.greeting);

        let btnStart = new MenuButton('Начать', this.start.bind(this));
        btnStart.sprite.position.y = 200;
        let btnRecords = new MenuButton('Рекорды', this.records.bind(this));
        btnRecords.sprite.position.y = 250;

        this.buttons = [btnStart, btnRecords];

        World.game.stage.addChild(btnStart.sprite);
        World.game.stage.addChild(btnRecords.sprite);
        btnStart.select();

        this.keys = {};
        this.in_move = false;
        ArrowMovable.call(this);
        this._on('up', function () {
            if (this.in_move) return;
            this.in_move = true;
            for (let i in this.buttons) {
                let btn = this.buttons[i];
                if (btn.isSelected() && i > 0) {
                    btn.unselect();
                    this.buttons[i - 1].select();
                    return;
                }
            }
        }.bind(this));
        this._on('up_end', function () {
            this.in_move = false;
        }.bind(this));
        this._on('down', function () {
            if (this.in_move) return;
            this.in_move = true;
            for (let i in this.buttons) {
                let btn = this.buttons[i];
                if (btn.isSelected() && i < this.buttons.length - 1) {
                    btn.unselect();
                    this.buttons[parseInt(i) + 1].select();
                    return;
                }
            }
        }.bind(this));
        this._on('down_end', function () {
            this.in_move = false;
        }.bind(this));
        this.keys.enter = new Key(13, () => {
            if (this.in_move) return;
            this.in_move = true;
            for (let i in this.buttons) {
                let btn = this.buttons[i];
                if (btn.isSelected()) {
                    btn.resolve();
                    return;
                }
            }
        }, () => {
            this.in_move = false;
        });
    }

    start() {
        let steps = 4;
        for (let i = 0; i < steps; i++) {
            setTimeout(function () {
                let coef = 1 - ((i + 1) / steps);
                this.clouds.sprite.alpha = coef;
                this.greeting.alpha = coef;
                for (let i in this.buttons) {
                    let btn = this.buttons[i];
                    btn.sprite.alpha = coef;
                }
            }.bind(this), (i + 1) * World.game.speed * 20);
        }
        setTimeout(function () {
            delete World.game.state;
            World.game.state = new Play();
        }.bind(this), 5 * World.game.speed * 20)
    }

    records() {
        alert('Извините, рекорды я еще не реализовал');
    }
}