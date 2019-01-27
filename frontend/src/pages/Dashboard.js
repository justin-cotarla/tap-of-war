import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

import Title from '../components/Title';
import Team from '../components/Team';

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
    render() {
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
                <Grid.Column width={8}>
                    <Team name="A" roster={rosterA}/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Team name="B" roster={rosterB}/>
                </Grid.Column>
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
