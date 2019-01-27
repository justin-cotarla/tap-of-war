import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';

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
            marginTop: '1em',
            padding: '1em 4em', 
        }}>
            <Grid.Row>
                <Grid.Column width={16} textAlign="center">
                    <Header 
                        textAlign="center" 
                        as="h1"
                        style={{
                            fontSize: '42px',
                            margin: '1em',
                        }}>
                        Tap Of War!
                    </Header>
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
            <Grid.Row centered style={{ margin: '1em 0' }}>
                <Button attached="bottom" size="big" style={{ width: '200px' }}>Battle!</Button>
            </Grid.Row>
        </Grid>
    }
}
