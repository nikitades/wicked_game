export default class State {

    constructor() {
        this.inited = false;
        this._models = {};
    }

    get models() {
        return this._models;
    }

    set models(value) {
        this._models = value;
    }

    init() {

    }

    run() {
        console.error('Run function is not implemented!');
    }
}