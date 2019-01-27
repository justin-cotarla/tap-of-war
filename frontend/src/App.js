import React, { Component } from 'react';
import io from 'socket.io-client';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Join from './pages/Join';
import War from './pages/War';

import './App.css';

class App extends Component {
    componentDidMount() {
        const socket = io('localhost');
        socket.on('push', data => {
            console.log(data);
        })
    }
  render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/join" component={Join}/>
                    <Route path="/war" component={War} />
                </Switch>
            </BrowserRouter>
        );
    }
}
    
export default App;
