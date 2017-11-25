import Game from "./Game";

export default class Key {
    install() {
        if (!Key.inited) {
            Key.inited = true;
            window.onkeydown = function (e) {
                let code = e.keyCode;
                if (Key.pressed.indexOf(code) === -1) Key.pressed.push(code);
            };
            window.onkeyup = function (e) {
                let code = e.keyCode;
                for (let i in Key.pressed) if (Key.pressed[i] === code) {
                    delete Key.pressed[i];
                    if (code in Key.codes) {
                        for (let i in Key.codes[code]) {
                            let key = Key.codes[code][i];
                            key.isDown = false;
                            key.isUp = true;
                            key.release();
                        }
                    }
                }
            };
            Game.onloop.push(Key.handle);
        }
        Key.pressed = Key.pressed || [];
        Key.codes = Key.codes || {};
        Key.codes[this.code] = Key.codes[this.code] || [];
        Key.codes[this.code].push(this);
        Key.keys = Key.keys || [];
    }

    static handle() {
        for (let i in Key.pressed) {
            let code = Key.pressed[i];
            if (code in Key.codes) {
                for (let i in Key.codes[code]) {
                    let key = Key.codes[code][i];
                    key.isDown = true;
                    key.isUp = false;
                    key.press();
                }
            }
        }
    }

    constructor(code, press, release) {
        this.code = code;
        this.press = press || null;
        this.release = release || null;

        this.isDown = false;
        this.isUp = true;

        this.install();
    }
}