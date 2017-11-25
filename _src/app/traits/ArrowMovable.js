import Key from "../core/Key";

export default function ArrowMovable() {
    this.keys.up = new Key(38, function () {
        this._fire('move_start');
        this._fire('up');
    }.bind(this), function () {
        this._fire('move_end');
        this._fire('up_end');
    }.bind(this));
    this.keys.down = new Key(40, function () {
        this._fire('move_start');
        this._fire('down');
    }.bind(this), function () {
        this._fire('move_end');
        this._fire('down_end');
    }.bind(this));
    this.keys.left = new Key(37, function () {
        this._fire('move_start');
        this._fire('left');
    }.bind(this), function () {
        this._fire('move_end');
        this._fire('left_end');
    }.bind(this));
    this.keys.right = new Key(39, function () {
        this._fire('move_start');
        this._fire('right');
    }.bind(this), function () {
        this._fire('move_end');
        this._fire('right_end');
    }.bind(this));
}