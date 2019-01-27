import React from 'react';
import { Header, Statistic, Grid } from 'semantic-ui-react';

export default class GameEnd extends React.Component {
    render() {
        const { won, totalTeamTaps, tapsPerSecond, avgTeamTapRate, color } = this.props;
        return <Grid  verticalAlign="middle" style={{ height: '100%', backgroundColor: color }}>
            <Grid.Column style={{ maxWidth: '90%', margin: 'auto' }}>
                <Header as="h1" style={{ display: 'inline', fontSize: '32px' }}>
                    Your team {won ? 'won!' : 'lost :('}
                </Header>
                <Header as="h2" style={{ margin: '0.5em' }}>
                    Team
                </Header>
                <Statistic.Group style={{ flexDirection: 'column', margin: '0.5em' }}>
                    <Statistic horizontal>
                        <Statistic.Value>{totalTeamTaps}</Statistic.Value>
                        <Statistic.Label>Total Team Taps</Statistic.Label>
                    </Statistic>
                    <Statistic horizontal size="tiny">
                        <Statistic.Value>{avgTeamTapRate}</Statistic.Value>
                        <Statistic.Label>taps per second</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <Header as="h2" style={{ margin: '0.5em' }}>
                    You
                </Header>
                <Statistic.Group style={{ flexDirection: 'column', margin: '0.5em' }}>
                    <Statistic horizontal size="tiny">
                        <Statistic.Value>{tapsPerSecond}</Statistic.Value>
                        <Statistic.Label>taps per second</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Grid.Column>
        </Grid>
    }
}
