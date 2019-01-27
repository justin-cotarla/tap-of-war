import React from 'react';
import { Redirect } from 'react-router-dom';

import Title from '../components/Title';
import JoinForm from '../components/JoinForm';

import io from 'socket.io-client';

export default class Join extends React.Component {
    state = {
        name: '',
        joining: false,
        redirect: null,
        socket: null,
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    handleSubmit = () => {
        this.setState({ joining: true }, () => {
            const socket = io(`localhost?name=${this.state.name}`);
            socket.on('connected', () => {
                this.setState({ 
                    joining: false,
                    redirect: '/war',
                    socket,
                });
            });
        });
    }

    render() {
        const { name, joining, redirect, socket } = this.state;

        if(redirect) { 
            return <Redirect push to={{
                pathname: '/war',
                state: { socket, name },
            }}/>
        }

        return (
            <div>
                <Title/>
                <JoinForm 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}
                    name={name}
                    joining={joining}/>
            </div>
        );
    }
}
