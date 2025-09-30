import { Player } from "../../entities/player/Player.js";

export class PlayerManager {
    constructor() {
        this.players = [];
        this.gameUI = null;
    }

    setUI = (gameUI) => {
        this.gameUI = gameUI;
    }

    setPlayers = () => {
        localStorage.setItem('player', JSON.stringify(this.players));
    }

    getPlayers = () => {
        this.players = JSON.parse(localStorage.getItem('player'));
        this.gameUI.renderPlayers(this.players);
    }

    addPlayer = (name, points) => {
        const newPlayer = new Player(name, points);
        this.players.push(newPlayer);

        this.players.sort((a, b) => b.points - a.points);
        this.players = this.players.slice(0, 10);

        this.gameUI.renderPlayers(this.players);
        this.setPlayers();
    };
}