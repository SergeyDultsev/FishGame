const playersManager = new PlayersManager();
const gameManager = new GameManager();

function Players(username, sumPoint) {
    this.playerName = username;
    this.point = sumPoint;
}

function PlayersManager() {
    this.players = [];

    this.addPlayer = (player) => {
        this.players.push(player);
        this.renderPlayerList();
    };

    this.renderPlayerList = () => {
        const playerList = document.querySelector(".player-list");
        playerList.innerHTML = "";

        const sortedPlayers = this.players.sort((a, b) => b.point - a.point);
        let bestPlayer = sortedPlayers.slice(0, 10);

        bestPlayer.forEach((player, index) => {
            playerList.insertAdjacentHTML("beforeEnd", this.renderPlayerTemplate(player, index));
        });
    };

    this.renderPlayerTemplate = (player, index) => {
        return `
            <div class="player-border-top"></div>
            <article class="player-item" data-id="${index}">
                <div class="player-item__left">
                    <p id="player-id" class="player-data">${index + 1}</p>
                    <p id="player-name" class="player-data">${player.playerName}</p>
                </div>
                <p id="player-point" class="player-data">${player.point}</p>
            </article>
        `;
    };
}

function getPlayerData() {
    const playerNameInput = document.getElementById("player-name");

    const player = new Players(playerNameInput.value, gameManager.sumPoint);
    playersManager.addPlayer(player);

    playerNameInput.value = "";
    gameManager.sumPoint = 0;
}


function GameManager(){
    this.stateGame = false;
    this.timeInSeconds = 60;
    this.sumPoint = 0;
    this.numberOfFish = 0;
    this.fishInterval;
    this.timeInterval;

    this.updateTime = () => {
        if (this.stateGame){
            const timeElement = document.querySelector(".check-item__time");

            const minutes = Math.floor(this.timeInSeconds / 60);
            const seconds = this.timeInSeconds % 60;
            timeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            this.timeInSeconds--;
    
            if (minutes === 0 && seconds === 0) this.gameOver();
        } else{
            return false;
        }
    };

    this.resetGame = () => {
        const seconds = this.timeInSeconds = 60;
        const minutes = Math.floor(this.timeInSeconds / 60);

        document.querySelector(".check-item__time").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        document.querySelector(".check-item__point").innerHTML = 0;
    };

    this.increasePoints = (points) => {
        const pointElement = document.querySelector(".check-item__point");
        if(this.stateGame){
            this.sumPoint += points;
    
            if (pointElement) {
                pointElement.innerHTML = this.sumPoint;
            }
        }
    };

    this.gameOver = () => {
        this.stateGame = false;

        document.querySelector(".sea").style.display = "none";
        document.querySelector(".form-player").style.display = "flex";
        document.querySelector(".rating").style.display = "flex";
        document.querySelector(".check-block").style.display = "none";
        
        getPlayerData();
        clearSea();
        this.resetGame();
    };
}

// Запуск игры
document.querySelector(".form-player").addEventListener("click", function (event) {
    if (event.target.id == "play") {
        if (document.querySelector(".form-input").value.trim() !== '') {
            document.querySelector(".sea").style.display = "block";
            document.querySelector(".form-player").style.display = "none";
            document.querySelector(".rating").style.display = "none";
            document.querySelector(".check-block").style.display = "flex";
            gameManager.stateGame = true

            clearInterval(gameManager.fishInterval);
            clearInterval(gameManager.timeInterval);

            gameManager.fishInterval = setInterval(function () {
                gameManager.numberOfFish = Math.floor(Math.random() * 10) + 1;
                renderFish();
            }, 1000);

            gameManager.timeInterval = setInterval(function () {
                gameManager.updateTime();
            }, 1000);
        }
    }
});

function renderFish() {
    if (gameManager.stateGame) {
        const gameArea = document.querySelector(".game-area");
        for (let i = 0; i < gameManager.numberOfFish; i++) {
            let maxWidth = gameArea.innerWidth - 60;
            let maxHeight = gameArea.clientHeight - 60;

            let x = Math.floor(Math.random() * maxWidth) + 1;
            let y = Math.floor(Math.random() * maxHeight) + 1;

            let point = [10, 20, 30, 40][Math.floor(Math.random() * 4)];
            let widthFish = point;
            let heightFish = point;

            let fish = document.createElement('div');
            fish.className = 'fish';
            fish.dataset.points = point;

            fish.style.backgroundImage = `url('./src/img/general-images/fish.png')`;

            fish.style.left = x + 'px';
            fish.style.top = y + 'px';

            fish.style.width = widthFish + 'px';
            fish.style.height = heightFish + 'px';

            gameArea.appendChild(fish);
            moveFish(fish);
            gameManager.numberOfFish = 0;
        }

        gameArea.addEventListener("click", function(event) {
            const clickedFish = event.target.closest('.fish');
    
            if(clickedFish && !clickedFish.clicked) {
                clickedFish.clicked = true;
                const points = parseInt(clickedFish.dataset.points);
                const pointElement = document.querySelector(".check-item__point");
        
                gameManager.sumPoint += points;
                gameManager.increasePoints(points);
                pointElement.innerHTML = gameManager.sumPoint;
                clickedFish.remove();
            }
        });
    }
}

function moveFish(fish) {
    if (gameManager.stateGame) {
        const gameArea = document.querySelector(".game-area");
        let left = parseFloat(fish.style.left) || 0;

        function animate() {
            left += 2;
            fish.style.left = left + 'px';

            if (left + fish.clientWidth > gameArea.clientWidth) {
                fish.remove();
                return;
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
}

function clearSea() {
    const gameArea = document.querySelector(".game-area");
    while (gameArea.firstChild) gameArea.removeChild(gameArea.firstChild);
}