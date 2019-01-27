import React from 'react';
import { Header } from 'semantic-ui-react';
import Roster from './Roster';

const Team = (props) => {
    const { name, color, roster } = props;
    return (
        <div>
            <Header as="h1" size="huge" color={color}>Team {name}</Header>
            <Roster roster={roster}/>
        </div>
    );
}

export default Team;
