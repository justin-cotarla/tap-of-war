import TapOfWar from './TapOfWar';
import convert from 'color-convert';

const io = require('socket.io')();

const game = new TapOfWar();
let middleManSocket;

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
    const random = Math.floor(Math.random() * (colors.length));
    const colorA = colors[random];
    const colorB = colors[(random + 4) % colors.length];

    return [colorA, colorB];
}

const init = () => {
    io.of('/client').on('connect', socket => {
        const playerName = socket.handshake.query.name;

        if (game.isStarted) {
            return;
        }

        socket.on('tap', client => {
            game.addPoint(client.id);
        });

        // Create new player with name and assign to team
        const teamId = game.addPlayerToGame(client.id, playerName);
        client.emit('connected', {
            name: playerName,
            teamId: teamId,
        });
    });

    io.of('/middleman').on('connect', socket => {
        console.log('Connected to middleman');
        middleManSocket = socket;
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

            socket.emit('initialized', [
                {
                    id: 0,
                    name: 'Team 1',
                    color: colors[0],
                    roster: [],
                },
                {
                    id: 1,
                    name: 'Team 2',
                    color: colors[1],
                    roster: [],
                }
            ]);

            socket.on('start', client => {
                // Start the game
                if (!game.isStarted){
                    game.start();
                    client.emit('started');
                    middleManSocket.emit('start');
                }
            });

            socket.on('end', client => {
                // End game and calculate stats
                if (game.isStarted) {
                    game.end();
                    client.emit('ended', {});
                    middleManSocket.emit('stop');
                }
            });
        });
    });

    io.listen(4000);

    console.log("Server listening on port 4000");
}


init();