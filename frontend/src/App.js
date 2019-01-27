import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Join from './pages/Join';

import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/join" component={Join}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
    
export default App;
    