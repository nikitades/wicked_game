export default function EventDriveable() {
    this._on('up', this.moveUp.bind(this));
    this._on('up_end', this.stopY.bind(this));
    this._on('down', this.moveDown.bind(this));
    this._on('down_end', this.stopY.bind(this));
    this._on('left', this.moveLeft.bind(this));
    this._on('turn_left', this.turnLeft.bind(this));
    this._on('left_end', this.stopX.bind(this));
    this._on('right', this.moveRight.bind(this));
    this._on('turn_right', this.turnRight.bind(this));
    this._on('right_end', this.stopX.bind(this));
    this._on('move_start', this.run.bind(this));
    this._on('move_end', this.stop.bind(this));
}