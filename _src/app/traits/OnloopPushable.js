import World from '../core/World';

export default function OnloopPushable() {
    this.uuid = Math.random().toString().slice(2);
    this.onloopPush = function (f) {
        World.game.onloop[this.uuid] = f;
    };
    this.onloopClear = function() {
        delete World.game.onloop[this.uuid];
    }
}