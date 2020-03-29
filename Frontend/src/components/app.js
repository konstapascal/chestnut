import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.css';
import Keys from './keys';
import Error from './error'
import Application from './application'
import Settings from './settings'
import Navigation from './navigation'
import LoginForm from './login';
import RegisterForm from './register';
import Users from './users';


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route exact path='/' component={Application} />
                        <Route exact path='/keys' component={Keys} />
                        <Route exact path='/users' component={Users} />
                        <Route exact path='/settings' component={Settings} />
                        <Route exact path='/login' component={LoginForm} />
                        <Route exact path='/register' component={RegisterForm} />
                        <Route component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}