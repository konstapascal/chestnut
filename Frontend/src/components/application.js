import React, { Component } from 'react'
import ApplicationMenu from './app.menu'
import { Header, List } from 'semantic-ui-react'

export default class Application extends Component {
    render() {
        return (
            <div style={{ padding: '2rem' }}>
                <Header as='h2' color='green'>Main application page</Header>

                <p>Functionalities here:</p>
                <List bulleted>
                    <List.Item>Create according view for each algorithm type</List.Item>
                    <List.Item>Encryption, Decryption, Signing and Verify Signature submenus</List.Item>
                </List>
                
                <p>Choose one of the following algorithms:</p>
                <ApplicationMenu />
            </div>
        )
    }
}