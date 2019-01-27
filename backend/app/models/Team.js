export default class Team {
    constructor(id, score) {
        this.id = id;
        this.color = ''; // randomly generate
        this.name = ''; // randomly generate
        this.roster = [];
        this.score = score;
        this.tapCount = 0;
    }

    addPlayer = (player) => {
        this.roster.push(player);
    }

    findPlayer = (socketId) => this.roster.find(x => x.socketId === socketId);

    decrementScore = () => {
        this.score--;
    }

    incrementScore = () => {
        this.score++;
    }

    updateTapCount = () => {
        this.tapCount++;
    }
}