export class GameUI {
    constructor(
        GameManager,
        PlayerManager
    ) {
        this.gameManager = GameManager;
        this.playerManager = PlayerManager;

        this.gameArea = document.querySelector('.game-area');
        this.sea = document.querySelector('.sea');
        this.rating = document.querySelector('.rating');
        this.formPlayer = document.querySelector('.form-player');
        this.checkBlock = document.querySelector('.check-block');
        this.points = document.querySelector('.check-item__point');
        this.timer = document.querySelector('.check-item__time');

        this.gameArea.addEventListener('click', (e) => {
            const fish = e.target.closest('.fish');

            if (fish) {
                const points = parseInt(fish.dataset.points);
                this.gameManager.addPoints(points);
                fish.remove();
            }
        });
    }

    setPlayer = (name, points) =>  {
        this.playerManager.addPlayer(name, points);
    }

    showMenu = () =>  {
        this.sea.style.display = 'none';
        this.formPlayer.style.display = 'flex';
        this.rating.style.display = 'flex';
        this.checkBlock.style.display = 'none';

        this.points.textContent = '0';
        this.timer.textContent = '1:00';
    }

    showGame = () =>  {
        this.sea.style.display = 'block';
        this.formPlayer.style.display = 'none';
        this.rating.style.display = 'none';
        this.checkBlock.style.display = 'flex';
    }

    updatePoints = (points) =>  {
        this.points.textContent = points;
    }

    updateTimer = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        this.timer.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    renderFish = (count) => {
        for (let i = 0; i < count; i++) {
            const fish = document.createElement('div');
            const size = [10, 20, 30, 40][Math.floor(Math.random() * 4)];

            fish.className = 'fish';
            fish.dataset.points = size;
            fish.style.width = `${size}px`;
            fish.style.height = `${size}px`;

            let x = Math.floor(Math.random() * (this.gameArea.clientWidth - size));
            let y = Math.floor(Math.random() * (this.gameArea.clientHeight - size));

            fish.style.left = `${x}px`;
            fish.style.top = `${y}px`;
            fish.style.backgroundImage = `url('./src/assets/img/general-images/fish.png')`;

            this.gameArea.appendChild(fish);
            this.moveFish(fish);
        }
    }

    moveFish = (fish) => {
        let left = parseInt(fish.style.left) || 0;

        const animate = () => {
            left += 2;
            fish.style.left = `${left}px`;

            if (left + fish.clientWidth > this.gameArea.clientWidth) {
                fish.remove();
                return;
            }

            requestAnimationFrame(animate);
        }

        animate();
    }

    clearGameArea = () => {
        this.gameArea.innerHTML = '';
    }

    renderPlayers = (players) => {
        const playerList = document.querySelector('.player-list');
        playerList.innerHTML = '';

        players.forEach((player, id) => {
            playerList.insertAdjacentHTML('beforeend', `
                <article class="player-item">
                    <div class="player-item__left">
                        <p id="player-id" class="player-data">${id + 1}</p>
                        <p id="player-name" class="player-data">${player.name}</p>
                    </div>
                    <p id="player-point" class="player-data">${player.points}</p>
                </article>
            `);
        });
    }
}