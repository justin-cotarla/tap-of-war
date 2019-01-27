import React from 'react';
import { Card } from 'semantic-ui-react';

const Player = (props) => {
    const { player } = props;
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {player.name}
                </Card.Header>
            </Card.Content>
        </Card>
    );
}

export default Player;
