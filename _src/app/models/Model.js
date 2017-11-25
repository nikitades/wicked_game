import Game from "../core/Game";

export default class Model {
    constructor() {
        this.events = {};
        this._init();
        this.keys = this.keys || {};
        this._handleKeys();
        if (!this.sprite) throw new Error('No sprite defined at ' + this.constructor.name);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.sprite.vy = 0;
        this.sprite.vx = 0;
        Game.onloop.push(this._onLoop.bind(this));
    }

    _on(_case, event) {
        if (typeof event === 'function') {
            if (!(_case in this.events)) {
                this.events[_case] = [];
            }
            this.events[_case].push(event);
        }
    }

    _fire(_case) {
        if (_case in this.events) {
            for (let i in this.events[_case]) {
                this.events[_case][i]();
            }
        }
    }

    _init() {

    }

    _handleKeys() {

    }

    _onLoop() {

    }
}