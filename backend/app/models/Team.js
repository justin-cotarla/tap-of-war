export default class Team {
    constructor(id, name, score, color) {
        this.id = id;
        this.color = ''  // TODO: randomly generate
        this.name = name;
        this.roster = [];
        this.score = score;
        this.tapCount = 0;
        this.color = color;
    }

    addPlayer(player) {
        this.roster.push(player);
    }

    findPlayer(socketId) {
        this.roster.find(x => x.socketId === socketId);
    }

    decrementScore() {
        this.score--;
    }

    incrementScore() {
        this.score++;
    }

    updateTapCount() {
        this.tapCount++;
    }
}

