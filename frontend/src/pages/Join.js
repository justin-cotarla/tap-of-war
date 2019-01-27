import React from 'react';
import { Route } from 'react-router-dom';

import Title from '../components/Title';
import JoinForm from '../components/JoinForm';

import War from '../pages/War';

import io from 'socket.io-client';

export default class Join extends React.Component {
    state = {
        name: '',
        joining: false,
        socket: null,
        toWarPage: false,
        teamColor: '',
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    handleSubmit = () => {
        this.setState({ joining: true }, () => {
            const socket = io(`${process.env.REACT_APP_IP}/client?name=${this.state.name}`);
            socket.on('joined', ({ name, color }) => {
                this.setState({ 
                    name,
                    teamColor: color,
                    joining: false,
                    toWarPage: true,
                    socket,
                });
            });
        });
    }

    renderWarPage = (props) => {
        const { socket } = this.state;
        return <War {...props} socket={socket}/>;
    }

    render() {
        const { name, joining, socket, teamColor, toWarPage  } = this.state;

        return (
            <div>
                <Title/>
                {
                    !toWarPage && <JoinForm 
                        handleChange={this.handleChange} 
                        handleSubmit={this.handleSubmit}
                        name={name}
                        joining={joining}/>
                }
                {
                    toWarPage && <War teamColor={teamColor} socket={socket}/>
                }
            </div>
        );
    }
}
