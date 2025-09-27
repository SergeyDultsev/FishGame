export class Game {
    constructor(
        stateGame,
        timeInSeconds,
        points,
        numberOfFish,
        fishInterval,
        timeInterval
    ) {
        this.stateGame = stateGame;
        this.timeInSeconds = timeInSeconds;
        this.points = points;
        this.numberOfFish = numberOfFish;
        this.fishInterval = fishInterval;
        this.timeInterval = timeInterval;
    }

    reset() {
        this.stateGame = false;
        this.timeInSeconds = 60;
        this.points = 0;
        this.numberOfFish = 0;
        this.fishInterval = null;
        this.timeInterval = false;
    }
}