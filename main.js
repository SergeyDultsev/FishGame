import { GameManager } from './src/features/game/GameManager.js';
import { PlayerManager } from './src/features/player/PlayerManager.js';
import { GameUI } from "./src/features/game/gameUI.js";

const gameManager = new GameManager();
const playerManager = new PlayerManager();

const gameUI = new GameUI(gameManager, playerManager);

gameManager.setUI(gameUI);
playerManager.setUI(gameUI);

document.getElementById('play').addEventListener('click',  () => {
    const name = document.getElementById('player-name').value.trim();
    if (!name) return;
    gameManager.start(name);
});