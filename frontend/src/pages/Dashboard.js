import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

import Title from '../components/Title';
import Team from '../components/Team';
import Timer from '../components/Timer';

import io from 'socket.io-client';

export default class Dashboard extends React.Component {
    state = {
        teams: null,
        gameStarted: false,
        gameLength: 20,
    }

    componentDidMount() {
        const socket = io(`${process.env.REACT_APP_IP}/dashboard`);

        this.setState({
            socket,
        })

        socket.on('connect', () => {
            console.log('Connected');
            socket.emit('initialize');
        });
        socket.on('initialized', (teams) => {
            console.log('Initialized');
            console.log(teams)
            this.setState({ teams });
        });

        socket.on('joined', ({ teamId, name }) => {
            const { teams } = this.state;
            console.log(teams[teamId]);

            teams[teamId] = { 
                ...teams[teamId],
                roster: [...teams[teamId].roster, { name }],
            };

            this.setState({
                teams,
            });
        });

    }

    handleStart = () => {
        this.setState({ gameStarted: true }, () => {
            this.state.socket.emit('start');
        });
    }

    handleTimerEnd = () => {
        this.setState({ gameEnded: true }, () => {
            this.state.socket.emit('end', () => ({
                time: this.state.gameLength,
            }));
        });
    }

    render() {
        const { teams, gameStarted, gameLength } = this.state;
        return <div>
            <Title/>
            <Grid  style={{ 
                height: '70vh',
                padding: '0 4em', 
            }}>
                <Grid.Row style={{ height: '70%' }}>
                {
                    teams && teams.map((team) => (
                        <Grid.Column key={team.name} width={8}>
                            <Team name={team.name} color={team.color} roster={team.roster}/>
                        </Grid.Column>
                    ))
                }
                </Grid.Row>
                <Grid.Row style={{ height: '30%' }}>
                    {
                        !gameStarted && <Button 
                            disabled={gameStarted}
                            attached="bottom"
                            size="big" 
                            style={{ 
                                width: '200px',
                                height: '50px',
                                margin: 'auto',
                            }}
                            onClick={this.handleStart}>
                                Battle!
                        </Button>
                    }
                    {
                        gameStarted && <Timer value={gameLength} onTimerEnd={this.handleTimerEnd}/>
                    }
                </Grid.Row>
            </Grid>
        </div>
    }
}
