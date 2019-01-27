import React from 'react';
import { Header } from 'semantic-ui-react';

const Title = (props) => (
    <Header 
        textAlign="center" 
        as="h1"
        style={{
            fontSize: '42px',
            margin: '1em',
        }}>
        Tap Of War!
    </Header>
);

export default Title;
