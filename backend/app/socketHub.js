const io = require('socket.io')();

// TODO: middleman connection

io.on('connect', client => {
    const playerName = socket.handshake.query.name;
    // TODO: Create new player with name and assign to team
    client.emit('connected', {
        name: playerName,
        teamId: 0,
    });
});

io.on('tap', client => {
    // Check client.id to see which team
    // emit to middleman
});

io.of('/dashboard').on('connect', client => {
    client.emit('connected');
});

io.of('/dashboard').on('start', client => {
    // Start the game
    client.emit('started');
});

io.of('/dashboard').on('end', client => {
    // End game and calculate stats
    client.emit('ended');
});

io.of('/dashboard').on('initialize', client => {
    // Initialize game and teams
    // team 1
    // team 2
    client.emit('initialized', {});
});

export { io };