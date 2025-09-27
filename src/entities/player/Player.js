export class Player {
    constructor(
        name,
        points = 0
    ) {
        this.name = name;
        this.points = points;
    }

    reset = () => {
        this.name = '';
        this.points = 0;
    }
}