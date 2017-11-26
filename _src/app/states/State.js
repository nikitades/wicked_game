import EventControlable from "../traits/EventControlable";

export default class State {

    constructor() {
        this.inited = false;
        this.toRun = {};
        this._on = EventControlable._on.bind(this);
        this._fire = EventControlable._fire.bind(this);
    }

    init() {

    }

    run() {
        for (let i in this.toRun) {
            if (!this.toRun.hasOwnProperty(i)) continue;
            let f = this.toRun[i];
            if (typeof f === 'function') f();
        }
    }

    /** @return boolean */
    hit(a, b) {
        let ab = a.getBounds();
        let bb = b.getBounds();
        return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
    };
}