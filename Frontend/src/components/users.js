import React, { Component } from 'react'
import Page from './page'
import { Input } from 'semantic-ui-react'

export default class Users extends Component {
    render() {
        return(
            <>
            <Page title="Users"/>
            <p>Functionalities here:</p>
            <ul>
                <li>List all users</li>
                <li>Filter by searching</li>
                <li>Get keys by user</li>
            </ul>
            <Input icon='search' placeholder='Search users...' />
            </>
        )
    }
}
