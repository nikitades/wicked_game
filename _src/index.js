import Game from './app/core/Game';
import Play from "./app/states/Play";
import World from './app/core/World';
import Menu from "./app/states/Menu";

World.game = new Game();
World.game.state = new Menu();