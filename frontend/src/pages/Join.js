import React from 'react';

import Title from '../components/Title';
import JoinForm from '../components/JoinForm';

export default class Join extends React.Component {
    state = {
        name: '',
        joining: false,
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });
    handleSubmit = () => {
        this.setState({ joining: true });
    }

    render() {
        const { name, joining } = this.state;
        return (
            <div>
                <Title/>
                <JoinForm 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}
                    name={name}
                    joining={joining}/>
            </div>
        );
    }
}
