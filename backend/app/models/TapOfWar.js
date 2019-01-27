import Team from "./Team";
import Player from "./Player";

export default class TapOfWar {
    MAX_SCORE = 100;
    first = true
    gameStarted = false;

    constructor(id) {
        this.id = id;
        this.firstTeam = new Team(1, 'Team 1', MAX_SCORE/2);
        this.secondTeam = new Team(2, 'Team 2', MAX_SCORE/2);
    }

    addPlayerToGame = (socketId, name) => {
        const player = new Player(socketId, name);
        if (first) {
            this.firstTeam.addPlayer(player);
            first = !first;
            return this.firstTeam.id;
        } else {
            this.secondTeam.addPlayer(player);
            first = !first;
            return this.secondTeam.id;
        }
    } 

    toggleGameStatus = () => this.gameStarted != this.gameStarted;

    updateScore = (socketId) => {
        if (this.firstTeam.roster.find(x => x.socketId === socketId)) {
            this.firstTeam.incrementScore();
            this.secondTeam.decrementScore();
        } else {
            this.secondTeam.incrementScore();
            this.firstTeam.decrementScore();
        }
        if (this.firstTeam.score === 0 || this.secondTeam.score === 0) {
            this.toggleGameStatus();
        }
    }
}