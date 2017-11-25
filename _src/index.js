import Game from './app/core/Game';
import Play from "./app/states/Play";

const game = new Game();
game.state = new Play();