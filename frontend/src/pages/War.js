import React from 'react';
import { Redirect } from 'react-router-dom';

import Tapper from '../components/Tapper';
import GameEnd from '../components/GameEnd';

export default class War extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: this.props.socket,
            teamColor: this.props.teamColor,
            gameStarted: false,
            gameEnded: false,
            endGameStats: null,
        }
    }

    componentDidMount() {
        const { socket } = this.state;
        socket.on('started', () => {
            this.setState({ gameStarted: true });
        });

        socket.on('ended', (stats) => {
            console.log(stats);
            this.setState({ gameEnded: true, endGameStats: stats, });
        });
    }

    render() {
        const { 
            socket,
            name,
            gameStarted,
            gameEnded,
            teamColor,
            endGameStats
        } = this.state;

        if(!socket) {
            return <Redirect to="/join"/>;
        }

        if(gameEnded && endGameStats) {
            return <GameEnd stats={endGameStats}/>
        }

        return <Tapper color={teamColor} active={gameStarted} socket={socket}/>
    }
}
