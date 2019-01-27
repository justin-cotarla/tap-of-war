import React from 'react';
import { Header } from 'semantic-ui-react';
import Roster from './Roster';

const Team = (props) => {
    const { name, roster } = props;
    return (
        <div>
            <Header as="h1" size="huge">Team {name}</Header>
            <Roster roster={roster}/>
        </div>
    );
}

export default Team;
