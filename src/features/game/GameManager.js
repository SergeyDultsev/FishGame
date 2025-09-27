import { Game } from "../../entities/game/Game.js";
import { Player } from "../../entities/player/Player.js";

export class GameManager {
    constructor() {
        this.game = new Game();
        this.gameUI = null;
        this.player = null;
    }

    setUI = (gameUI) => {
        this.gameUI = gameUI;
    }

    start = (name) => {
        this.game.reset();
        this.game.stateGame = true;
        this.gameUI.showGame();

        this.player = new Player(name, 0);

        this.game.fishInterval = setInterval(() => {
            this.game.numberOfFish = Math.floor(Math.random() * 10) + 1;
            this.gameUI.renderFish(this.game.numberOfFish);
        }, 1000);

        this.game.timeInterval = setInterval(() => this.updateTime(), 1000);
    }

    stop = () => {
        this.game.stateGame = false;
        clearInterval(this.game.fishInterval);
        clearInterval(this.game.timeInterval);
        this.gameUI.clearGameArea();
        this.gameUI.showMenu();
        if (this.player) this.gameUI.setPlayer(this.player.name, this.player.points);
        this.player.reset();
    }

    updateTime = () => {
        if (!this.game.stateGame) return;

        this.game.timeInSeconds--;
        this.gameUI.updateTimer(this.game.timeInSeconds);

        if (this.game.timeInSeconds <= 0) this.stop();
    }

    addPoints = (points) => {
        if (!this.game.stateGame) return;
        this.game.points += points;
        this.player.points += points;
        this.gameUI.updatePoints(this.game.points);
    };
}