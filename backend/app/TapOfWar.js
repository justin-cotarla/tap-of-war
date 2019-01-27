import Team from "./models/Team";
import Player from "./models/Player";

const MAX_SCORE = 100;
const MAX_TIME = 60 * 30;

export default class TapOfWar {
    init(colors) {
        this.first = true;
        this.isStarted = false;

        this.firstTeam = new Team(0, 'Team 1', MAX_SCORE/2, colors[0]);
        this.secondTeam = new Team(1, 'Team 2', MAX_SCORE/2, colors[1]);
    }

    addPlayerToGame(socketId, name) {
        const player = new Player(socketId, name);
        if (this.first) {
            this.firstTeam.addPlayer(player);
            this.first = !this.first;
            return this.firstTeam.id;
        } else {
            this.secondTeam.addPlayer(player);
            this.first = !this.first;
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

    calculateIndividualStats = (id, timeSpent) => {
        const teamId = this.firstTeam.roster.find(x => x.socketId === id) ? 0 : 1;
        
        const totalTaps = teamId === 0 
            ? this.firstTeam.find(x => x.socketId === id).tapCount : this.secondTeam.find(x => x.socketId === id).tapCount;
        const totalTeamTaps = teamId === 0 ? this.firstTeam.tapCount : this.secondTeam.tapCount;

        const tapsPerSecond = totalTaps / timeSpent;
        const avgTeamTapRate = totalTeamTaps / timeSpent;

        const ratio = totalTaps / totalTeamTaps;

        const won = teamId === 0 
            ? this.firstTeam.score > this.secondTeam.score
            : this.secondTeam.score > this.firstTeam.score;

        return {
            won,
            totalTaps,
            totalTeamTaps,
            tapsPerSecond,
            avgTeamTapRate,
            ratio
        }
    }
}