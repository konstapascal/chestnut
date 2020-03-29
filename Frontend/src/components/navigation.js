import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class Navigation extends Component {
    render() {
        return (
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
                        <Nav.Link href="/register">Register</Nav.Link>
                    </NavItem>
                    <NavItem >
                        <Nav.Link href="/login">Login</Nav.Link>
                    </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
