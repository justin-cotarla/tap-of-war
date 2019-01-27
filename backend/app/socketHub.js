import GameCache from './cache/GameCache';
import TapOfWar from './models/TapOfWar';
const io = require('socket.io')();

io.on('connect', client => {
    const playerName = socket.handshake.query.name;
    const game = GameCache.getGameFromCache(1);
    // Create new player with name and assign to team
    if (!game.gameStarted) {
        const teamId = game.addPlayerToGame(client.id, playerName);
        client.emit('connected', {
            name: playerName,
            teamId: teamId,
        });   
    } else {
        client.emit('failed');
    }
});

io.on('tap', client => {
    // RGB array
    GameCache.getGameFromCache(1).updateScore(client.id);
    io.of('/middleman').emit('set', {});
});

io.of('/middleman').on('connect', client => {
    client.emit('connected');
});

io.of('/dashboard').on('connect', client => {
    client.emit('connected');
});

io.of('/dashboard').on('start', client => {
    // Start the game
    const game = GameCache.getGameFromCache(1);
    if (!game.gameStarted){
        game.toggleGameStatus();
        client.emit('started');
    } else {
        client.emit('failed');
    }
});

io.of('/dashboard').on('end', client => {
    // End game and calculate stats
    const game = GameCache.getGameFromCache(1);
    if (game.gameStarted) {
        game.toggleGameStatus();
        GameCache.removeGameFromCache(1);
        client.emit('ended', {});
    } else {
        client.emit('failed');
    }
});

io.of('/dashboard').on('initialize', client => {
    // Initialize game and teams
    // team 1
    // team 2
    GameCache.addGameToCache(new TapOfWar(1));
    client.emit('initialized', {});
});

export { io };