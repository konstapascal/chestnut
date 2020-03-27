import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Keys from './keys';
import Error from './error'
import Application from './application'
import Settings from './settings'
import Search from './search';
import Navigation from './navigation'


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation />
                    <Switch>
                        <Route exact path='/' component={Application} />
                        <Route exact path='/keys' component={Keys} />
                        <Route exact path='/settings' component={Settings} />
                        <Route exact path='/search' component={Search} />
                        <Route component={Error} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
