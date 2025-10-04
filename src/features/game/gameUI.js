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
        const sizes = [15, 20, 25, 30, 35, 40, 45, 50];

        const centerX = this.gameArea.clientWidth / 2;
        const centerY = this.gameArea.clientHeight / 2;

        for (let i = 0; i < count; i++) {
            const fish = document.createElement('div');
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const speed = Math.floor(Math.random() * 4) + 2;

            fish.className = 'fish';
            fish.dataset.points = this.pointsFish(size, speed);
            fish.style.width = `${size}px`;
            fish.style.height = `${size}px`;

            const isMoving  = Math.random() >= 0.5;

            const offsetX = Math.random() * 80 - 40;
            const offsetY = Math.random() * 80 - 40;

            let x = centerX + offsetX - size / 2;
            let y = centerY + offsetY - size / 2

            if (isMoving) {
                fish.style.left = `${-size}px`;
                fish.style.transform = `scaleX(1)`;
            } else {
                fish.style.left = `${this.gameArea.clientHeight}px`;
                fish.style.transform = `scaleX(-1)`;
            }

            fish.style.left = `${x}px`;
            fish.style.top = `${y}px`;
            fish.style.transform = `scaleX(${isMoving ? 1 : -1})`;
            fish.style.backgroundImage = `url('./src/assets/img/general-images/fish.png')`;

            this.gameArea.appendChild(fish);
            this.moveFish(fish, speed, isMoving);
        }
    }

    pointsFish = (size, speed) => {
        if (!size || !speed) return 1;
        return Math.round((speed ** 2 / size) * 500);
    }

    moveFish = (fish, speed, isMoving) => {
        let currentX = parseInt(fish.style.left) || 0;

        const animate = () => {
            if (isMoving) {
                currentX += speed;
                fish.style.left = `${currentX}px`;

                if (currentX > this.gameArea.clientWidth) {
                    fish.remove();
                    return;
                }
            } else {
                currentX -= speed;
                fish.style.left = `${currentX}px`;

                if (currentX + fish.clientWidth < 0) {
                    fish.remove();
                    return;
                }
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
                    <div class="player-item__data">
                        <p id="player-id" class="player-data">${id + 1}</p>
                        <p id="player-name" class="player-data">${player.name}</p>
                        <p id="player-point" class="player-data">${player.points}</p>
                    </div>
                </article>
            `);
        });
    }
}