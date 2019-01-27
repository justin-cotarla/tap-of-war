import TapOfWar from './TapOfWar';
import convert from 'color-convert';

const io = require('socket.io')();

const game = new TapOfWar();

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'pink',
];

const generateColors = () => {
    const colorA = Math.random() * (colors.length);
    const colorB = (colorA + 4) % colors.length;

    return [colorA, colorB];
}

const init = () => {
    // io.of('/client').on('connect', client => {
    //     const playerName = socket.handshake.query.name;

    //     if (game.isStarted) {
    //         return;
    //     }
    //     // Create new player with name and assign to team
    //     const teamId = game.addPlayerToGame(client.id, playerName);
    //     client.emit('connected', {
    //         name: playerName,
    //         teamId: teamId,
    //     });
    // });

    // io.on('tap', client => {
    //     // RGB array
    //     GameCache.getGameFromCache(1).updateScore(client.id);
    //     io.of('/middleman').emit('set', {});
    // });




    io.of('/middleman').on('connect', socket => {
        console.log('Connected to middleman');
    });

    io.of('/dashboard').on('connect', socket => {
        console.log('Connected to dashboard');
        socket.on('initialize', client => {
            console.log('initialized')
            const colors = generateColors();
            game.init([
                convert.keyword.rgb(colors[0]),
                convert.keyword.rgb(colors[1]),
            ]);

            socket.emit('initialized', colors);
        });
    });

    // io.of('/dashboard').on('start', client => {
    //     // Start the game
    //     const game = GameCache.getGameFromCache(1);
    //     if (!game.gameStarted){
    //         game.toggleGameStatus();
    //         client.emit('started');
    //     } else {
    //         client.emit('failed');
    //     }
    // });

    // io.of('/dashboard').on('end', client => {
    //     // End game and calculate stats
    //     const game = GameCache.getGameFromCache(1);
    //     if (game.gameStarted) {
    //         game.toggleGameStatus();
    //         GameCache.removeGameFromCache(1);
    //         client.emit('ended', {});
    //     } else {
    //         client.emit('failed');
    //     }
    // });


    io.listen(4000);

    console.log("Server listening on port 4000");
}


init();