import React from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';

const JoinForm = (props) => {
    const { name, handleChange, handleSubmit, joining } = props;
    return (
        <Grid verticalAlign="middle" style={{ height: '100%' }}>
            <Grid.Column>
                <Form onSubmit={handleSubmit} style={{ 
                    maxWidth: '300px',
                    margin: 'auto',
                    }}>
                    <Form.Input
                        label="Nickname"
                        name="name"
                        value={name}
                        onChange={handleChange}/>
                    <Button 
                        fluid 
                        type='submit' 
                        disabled={joining || !name} 
                        loading={joining}
                        style={{ boxShadow: '0 3px 0 black' }}>
                            Join!
                    </Button>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default JoinForm;
