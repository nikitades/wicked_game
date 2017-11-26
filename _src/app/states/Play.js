import State from "./State";
import World from '../core/World';
import Ass from "../models/Ass";
import Dick from "../models/Dick";
import Clouds from "../models/Backgrounds/Clouds";
import HealthBar from "../models/HUD/HealthBar";

export default class Play extends State {
    init() {
        //фон
        World.game.stage.addChild((this.clouds = new Clouds()).sprite);
        this.clouds.sprite.alpha = 0;
        for (let i = 1; i < 5; i++) {
            setTimeout((() => {
                this.clouds.sprite.alpha = (1 / 5) * (i);
            }).bind(this), World.game.speed * 20 * (i + 1));
        }

        //объекты
        setTimeout(() => {
            //жёппы
            this.asses = [];
            for (let i = 0; i < 8; i++) {
                let x = Math.random() * (640 - 128) + 64;
                let y = Math.random() * (480 - 128) + 64;
                let ass = new Ass(x, y);
                this.asses.push(ass);
                World.game.stage.addChild(ass.sprite);
            }

            //бенис
            World.game.stage.addChild((this.dick = new Dick()).sprite);
            this.dick.sprite.x = 320;
            this.dick.sprite.y = 240;
            this.dick.sprite.alpha = 1;

            //хп бар бениса
            World.game.stage.addChild((this.healthbar = new HealthBar()).sprite);

            //изменяем раннер
            this.toRun['dickMove'] = function () {
                this.dick.sprite.x += this.dick.sprite.vx;
                this.dick.sprite.y += this.dick.sprite.vy;
            }.bind(this);

            this.toRun['dickCollision'] = function () {
                for (let i in this.asses) {
                    let ass = this.asses[i];
                    //можно итерировать по жопам у стейта, а можно по объектам сцены с проверкой на тип
                    if (World.game.stage.children.indexOf(ass.sprite) !== -1 && this.hit(ass.dickHitzone, this.dick.hitzone)) {
                        this.dick.suffer();
                    }
                    if (this.hit(ass.hitzone, this.dick.hitzone)) {
                        if (!ass.dying) ass.die();
                    }
                }
            }.bind(this);

            this.toRun['winCondition'] = function () {
                let assCount = 0;
                World.game.stage.children.map(item => {
                    if (item.model instanceof Ass) assCount++;
                });
                if (assCount === 0) this.win();
            }.bind(this);
        }, World.game.speed * 120);
    }

    lose() {
        //TODO: доделать поражение и победу
        //TODO: и время игры с пересчетом в очки
        //И начать таблицу рекордов
        console.log('Lost!');
    }

    win() {
        console.log('Won!');
    }
}