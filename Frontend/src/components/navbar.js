import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Keys from './keys';
import NotFound from './notfound'
import Application from './application'
import Settings from './settings'
import Search from './search';


export default class NavBar extends Component {
    render() {
        return (
            <BrowserRouter>
            <div>
                <div>
                    <Navbar>
                        <Navbar.Brand href="/">Chestnut</Navbar.Brand>
                        <Navbar.Collapse>
                            <Nav className="mr-auto">
                                <NavItem >
                                    <Nav.Link href="/">Application</Nav.Link>
                                </NavItem>
                                <NavItem >
                                    <Nav.Link href="/keys">My Keys</Nav.Link>
                                </NavItem>
                                <NavItem >
                                    <Nav.Link href="/settings">Account Settings</Nav.Link>
                                </NavItem>
                                <NavItem >
                                    <Nav.Link href="/search">Search Users</Nav.Link>
                                </NavItem>
                                <NavItem >
                                    <Nav.Link href="/test">Test Page</Nav.Link>
                                </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/' component={Application} />
                        <Route exact path='/keys' component={Keys} />
                        <Route exact path='/settings' component={Settings} />
                        <Route exact path='/search' component={Search} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
            </BrowserRouter>
        );
    }
}