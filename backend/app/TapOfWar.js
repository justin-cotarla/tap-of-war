import Team from "./models/Team";
import Player from "./models/Player";

const MAX_SCORE = 100;

export default class TapOfWar {
    init() {
        this.first = true;
        this.isStarted = false;

        this.firstTeam = new Team(1, 'Team 1', MAX_SCORE/2);
        this.secondTeam = new Team(2, 'Team 2', MAX_SCORE/2);
    }

    addPlayerToGame(socketId, name) {
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

    start() {
        this.isStarted = true;
    }

    end() {
        this.isStarted = false;
    }

    addPoint(socketId) {
        if (this.firstTeam.roster.find(x => x.socketId === socketId)) {
            this.firstTeam.incrementScore();
            this.secondTeam.decrementScore();
        } else {
            this.secondTeam.incrementScore();
            this.firstTeam.decrementScore();
        }

        console.log(`Team 1: ${firstTeam.score} | Team 2: ${secondTeam.score}`);

        if (this.firstTeam.score === 0 || this.secondTeam.score === 0) {
            this.toggleGameStatus();
        }
    }
}