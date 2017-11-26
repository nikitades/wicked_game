import World from '../core/World';

export default function Strafeable(distance = 50) {
    this.disabled = true;
    let steps = 5;
    for (let i = 0; i < steps; i++) {
        setTimeout(function () {
            switch (this.direction) {
                case 0:
                    this.sprite.position.y += (distance / steps);
                    if (this.sprite.position.y > World.game.height - 16) this.sprite.position.y = World.game.height - 16;
                    break;
                case 1:
                    this.sprite.position.x -= (distance / steps);
                    if (this.sprite.position.x < 0) this.sprite.position.x = 0;
                    break;
                case 2:
                    this.sprite.position.y -= (distance / steps);
                    if (this.sprite.position.y < 0) this.sprite.position.y = 0;
                    break;
                case 3:
                    this.sprite.position.x += (distance / steps);
                    if (this.sprite.position.x > World.game.width - 16) this.sprite.position.x = World.game.width - 16;
                    break;
            }
        }.bind(this), World.game.speed * i * steps);
    }
    setTimeout(function () {
        this.disabled = false;
    }.bind(this), World.game.speed * steps * 3);
}