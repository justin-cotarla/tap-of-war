import React from 'react';
import Player from './Player';
import { Card, Header } from 'semantic-ui-react';

const Roster = (props) => {
    const { roster } = props;
    return (
        <Card.Group itemsPerRow={1}>
            {roster.length === 0 && <Header as="h1">No one's here :(</Header>}
            {roster.map(player => <Player key={player.name} player={player}/>)}
        </Card.Group>
    )
}

export default Roster;
