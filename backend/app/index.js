import TapOfWar from './TapOfWar';
import convert from 'color-convert';

const io = require('socket.io')();


const game = new TapOfWar();
let middleManSocket;
let dashboardSocket;

let intervalIdMiddleMan;

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

const generateGradient = (team1Color, team2Color, percent) => {
    let gradient = [-1, -1, -1, -1, 0, 1, 1, 1, 1];

    if (percent !== 0.5) {
        gradient = gradient.map((num, index) => (Math.floor(percent*9) >= index) ? -1 : 1);
    }

    return gradient.map(code => {
        if (code < 0) {
            return team1Color;
        } else if (code > 0) {
            return team2Color;
        } else {
            return {
                r: 0,
                b: 0,
                g: 0,
            }
        }
    });
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
        const teamId = game.addPlayerToGame(socket.id, playerName);
        socket.emit('joined', {
            name: playerName,
            teamId,
            color: convert.keyword.rgb(teamId === 0 ? game.firstTeam.color : game.secondTeam.color),
        });

        dashboardSocket.emit('joined', {
            name: playerName,
            teamId,
       });
    });

    io.of('/middleman').on('connect', socket => {
        middleManSocket = socket;
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

            dashboardSocket = socket;

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
                    // client.emit('started');
                    io.sockets.emit('started');
                    middleManSocket.emit('start');
                    intervalIdMiddleMan = setInterval(() => {
                        middleManSocket.emit('set', generateGradient(
                            game.firstTeam.color,
                            game.secondTeam.color,
                            game.firstTeam.score/(game.firstTeam.score + game.SecondTeam.score),
                        ));
                    }, 200);
                }
            });

            socket.on('end', client => {
                // End game and calculate stats
                if (game.isStarted) {
                    game.end();
                    client.emit('ended', {});
                    middleManSocket.emit('stop');
                    clearInterval(intervalIdMiddleMan);

                    game.firstTeam.roster.forEach(x => {
                        const socketId = x.socketId;
                        const stats = game.calculateIndividualStats(socketId);
                        io.to(socketId).emit('ended', stats);
                    });
                    game.secondTeam.roster.forEach(x => {
                        const socketId = x.socketId;
                        const stats = game.calculateIndividualStats(socketId);
                        io.to(socketId).emit('ended', stats);
                    });
                }
            });
        });
    });

    io.listen(4000);

    console.log("Server listening on port 4000");
}


init();