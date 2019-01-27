import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

import Title from '../components/Title';
import Team from '../components/Team';

import io from 'socket.io-client';

const rosterA = [
    {
        name: 'Jay',
    },
    {
        name: 'Derek',
    },
    {
        name: 'Justin',
    },
    {
        name: 'Irina',
    },
];

const rosterB = [    
    {
        name: 'Tamar',
    },
    {
        name: 'Mat',
    },
    {
        name: 'Zach',
    },
    {
        name: 'Berge',
    },
];

export default class Dashboard extends React.Component {
    state = {
        teams: null,
    }

    componentDidMount() {
        const socket = io('localhost/dashboard');
        socket.emit('initialize');
        socket.on('initialized', (teams) => {
            this.setState({ teams });
        });

        socket.on('connected', (teamId, name) => {
            const { teams } = this.state;
            teams[teamId] = { 
                ...teams[teamId], roster: [...teams[teamId].roster, { name }],
            }
        });
    }

    render() {
        const { teams } = this.state;
        return <Grid style={{ 
            height: '100%',
            padding: '0 4em', 
        }}>
            <Grid.Row>
                <Grid.Column width={16} textAlign="center">
                    <Title/>
                </Grid.Column>      
            </Grid.Row>
            <Grid.Row>
            {
                teams && teams.map((team) => (
                    <Grid.Column key={team.name} width={8}>
                        <Team name={team.name} color={team.color} roster={rosterA}/>
                    </Grid.Column>
                ))
            }
            </Grid.Row>
            <Button 
                attached="bottom"
                size="big" 
                style={{ 
                    width: '200px',
                    height: '50px',
                    margin: 'auto',
                }}>Battle!</Button>
        </Grid>
    }
}
