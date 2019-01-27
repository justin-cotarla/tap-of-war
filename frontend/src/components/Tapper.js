import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

export default class Tapper extends React.Component {
    handleClick = () => {
        const { socket } = this.props;
        socket.emit('tap');
    }

    render() {
        const { color } = this.props;
        return (
            <Grid verticalAlign="middle" style={{ height: '100%' }}>
                <Grid.Column textAlign="center">
                    <Button onClick={this.handleClick} color={color} style={{
                        width: '200px',
                        height: '100px',
                        boxShadow: '0 5px 0 black',
                    }}>
                        Tap!
                    </Button>
                </Grid.Column>
            </Grid>
        );
    }
}
