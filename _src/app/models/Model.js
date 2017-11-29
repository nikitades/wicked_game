import World from "../core/World";
import EventControlable from '../traits/EventControlable';
import OnloopPushable from "../traits/OnloopPushable";

export default class Model {
    constructor() {
        this.events = {};
        this._on = EventControlable._on.bind(this);
        this._fire = EventControlable._fire.bind(this);
        OnloopPushable.call(this);
        this._init();
        this.keys = this.keys || {};
        this._handleKeys();
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.sprite.vy = 0;
        this.sprite.vx = 0;
        this.onloopPush(this._onLoop.bind(this));
        this._test();
    }

    _test() {
        if (!this.sprite) throw new Error('No sprite defined at ' + this.constructor.name);
    }

    _init() {

    }

    _handleKeys() {

    }

    _onLoop() {

    }
}