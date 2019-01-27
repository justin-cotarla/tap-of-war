import TapOfWar from './TapOfWar';
import convert from 'color-convert';

const io = require('socket.io')();


let game;
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
            return {
                r: team1Color[0],
                g: team1Color[1],
                b: team1Color[2],
            };
        } else if (code > 0) {
            return {
                r: team2Color[0],
                g: team2Color[1],
                b: team2Color[2],
            };
        } else {
            return {
                r: 255,
                b: 255,
                g: 255,
            }
        }
    });
}

const init = () => {
    io.of('/client').on('connect', socket => {
        const playerName = socket.handshake.query.name;

        if (!game || game.isStarted) {
            return;
        }

        socket.on('tap', () => {
            game.addPoint(socket.id);
        });

        // Create new player with name and assign to team
        const teamId = game.addPlayerToGame(socket.id, playerName, socket);
        socket.emit('joined', {
            name: playerName,
            color: convert.rgb.keyword(teamId === 0 ? game.firstTeam.color : game.secondTeam.color),
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
            console.log(colors);
            game = new TapOfWar([
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

            socket.on('start', () => {
                // Start the game
                if (!game.isStarted){
                    game.start();
                    socket.emit('started');
                    middleManSocket.emit('start');
                    intervalIdMiddleMan = setInterval(() => {
                        middleManSocket.emit('set', generateGradient(
                            game.firstTeam.color,
                            game.secondTeam.color,
                            game.firstTeam.score/(game.firstTeam.score + game.secondTeam.score),
                        ));
                    }, 200);
                }
            });

            socket.on('end', () => {
                // End game and calculate stats
                if (game.isStarted) {
                    game.end();
                    socket.emit('ended');
                    middleManSocket.emit('stop');
                    clearInterval(intervalIdMiddleMan);

                    let color = {
                        r: 255,
                        g: 255,
                        b: 255,
                    };
                    if (game.firstTeam.score > game.secondTeam.score) {
                        color = {
                            r: game.firstTeam.color[0],
                            g: game.firstTeam.color[1],
                            b: game.firstTeam.color[2],
                        };
                    } else if (game.firstTeam.score < game.secondTeam.score) {
                        color = {
                            r: game.secondTeam.color[0],
                            g: game.secondTeam.color[1],
                            b: game.secondTeam.color[2],
                        };
                    }

                    middleManSocket.emit('set', [
                        color,
                        color,
                        color,
                        color,
                        color,
                        color,
                        color,
                        color,
                        color,
                    ]);

                    game.firstTeam.roster.forEach(player => {
                        const socketId = player.socketId;
                        const stats = game.calculateIndividualStats(socketId);
                        player.socket.emit('ended', stats);
                        console.log(stats);
                    });
                    game.secondTeam.roster.forEach(player => {
                        const socketId = player.socketId;
                        const stats = game.calculateIndividualStats(socketId);
                        player.socket.emit('ended', stats);
                    });
                }
            });
        });
    });

    io.listen(4000);

    console.log("Server listening on port 4000");
}


init();