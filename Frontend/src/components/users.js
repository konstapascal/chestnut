import React, { Component } from 'react'
import { Input, Header, List } from 'semantic-ui-react'

export default class Users extends Component {
    render() {
        return(
            <div style={{ padding: '2rem' }}>
            <Header as='h2' color='green'>Search users</Header>
                <p>Functionalities here:</p>
                <List bulleted>
                    <List.Item>List all users</List.Item>
                    <List.Item>Filter by searching name</List.Item>
                    <List.Item>Easily get public keys from any user (button next to the result)</List.Item>
                </List>
            <Input icon='search' placeholder='Search users...' />
            </div>
        )
    }
}
