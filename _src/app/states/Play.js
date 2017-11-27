import State from "./State";
import World from '../core/World';
import Ass from "../models/Ass";
import Dick from "../models/Dick";
import Clouds from "../models/Backgrounds/Clouds";
import HealthBar from "../models/HUD/HealthBar";
import Scoreboard from "./Scoreboard";

export default class Play extends State {
	constructor(amount = 2, difficulty = 1) {
		super(amount, difficulty);
		this.amount = amount;
		World.game.difficulty = difficulty;
	}

	init() {
		//фон
		World.game.startTime = World.game.startTime || new Date();
		World.game.score = World.game.score || 0;
		World.game.stage.addChild((this.clouds = new Clouds()).sprite);
		this.clouds.sprite.alpha = 0;
		for (let i = 1; i < 5; i++) {
			setTimeout(function () {
				this.clouds.sprite.alpha = (1 / 5) * (i);
			}.bind(this), World.game.speed * 5 * (i + 1));
		}

		//объекты
		setTimeout(() => {
			//жёппы
			this.asses = [];
			for (let i = 0; i < this.amount; i++) {
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
					if (World.game.stage.children.indexOf(ass.sprite) !== -1 && this.hit(ass.dickHitzone, this.dick.hitzone) && !ass.dying) {
						this.dick.suffer();
					}
					if (
						this.hit(ass.hitzone, this.dick.hitzone)
						&& ass.direction === this.dick.direction
					) {
						if (!ass.wasHit) {
							World.game.score++;
							ass.wasHit = true;
							this.renew();
							this.dick.hp = this.dick.hp + 34 > 100 ? 100 : this.dick.hp + 34;
							World.game.state.healthbar.update(this.dick.hp);
							if (!ass.dying) ass.die();
						}
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

			this.renew();
		}, World.game.speed * 30);
	}

	renew() {
		if (this.safeTimeout) clearTimeout(this.safeTimeout);
		this.safeTimeout = setTimeout(this.lose.bind(this, true), 15000);
	}

	fade() {
		return new Promise(res => {
			delete this.toRun['dickMove'];
			delete this.toRun['dickCollision'];
			delete this.toRun['winCondition'];
			setTimeout(function () {
				let steps = 5;
				for (let i = 0; i < steps; i++) {
					setTimeout(function () {
						let coef = (steps - i - 1) / steps;
						this.clouds.sprite.alpha = coef;
						for (let i in this.asses) {
							this.asses[i].sprite.alpha = coef;
						}
						this.healthbar.sprite.alpha = coef;
						this.dick.sprite.alpha = coef;
						if (i === steps - 1) res();
					}.bind(this), World.game.speed * 5 * (i + 1));
				}
			}.bind(this), 50);
		})
	}

	lose(byTimeout = false) {
		clearTimeout(this.safeTimeout);
		this.fade().then(function () {
			delete World.game.state;
			World.game.state = new Scoreboard(false, byTimeout);
		}.bind(this));
	}

	win() {
		clearTimeout(this.safeTimeout);
		this.fade().then(function () {
			setTimeout(function () {
				for (let i in this.asses) {
					World.game.stage.removeChild(this.asses[i].sprite);
					World.game.stage.removeChild(this.dick.sprite);
					World.game.stage.removeChild(this.healthbar.sprite);
				}
			}.bind(this), 100);
			setTimeout(function () {
				delete World.game.state;
				World.game.state = new Play(Math.ceil(this.amount * 1.5), World.game.difficulty + 1);
			}.bind(this), 200);
		}.bind(this));
	}
}