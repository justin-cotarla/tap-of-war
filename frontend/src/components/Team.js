import React from 'react';
import { Header } from 'semantic-ui-react';
import Roster from './Roster';

const Team = (props) => {
    const { name, color, roster } = props;
    return (
        <div>
            <Header as="h1" size="huge" color={color} style={{ margin: '1em 0'}}>Team {name}</Header>
            <Roster roster={roster}/>
        </div>
    );
}

export default Team;
