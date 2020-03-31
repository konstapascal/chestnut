import React, { Component } from 'react'
import {Header, List, Button} from 'semantic-ui-react'

export default class Keys extends Component {
    render() {
        return (
            <div style={{ padding: '2rem' }}>
                <Header as='h2' color='green'>My keys</Header>
                <p>Functionalities here:</p>
                <List bulleted>
                    <List.Item>View keypairs in a list</List.Item>
                    <List.Item>Generate, import, delete keypairs</List.Item>
                </List>


                <p>Keypair list:</p>
                <List relaxed>
                    <List.Item>
                    <List.Icon name='key' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header>Keypair name 1</List.Header>
                        <List.Description>Keypair description</List.Description>
                    </List.Content>
                    </List.Item>

                    <List.Item>
                    <List.Icon name='key' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header>Keypair name 2</List.Header>
                        <List.Description>Keypair description</List.Description>
                    </List.Content>
                    </List.Item>

                    <List.Item>
                    <List.Icon name='key' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header>Keypair name 3</List.Header>
                        <List.Description>Keypair description</List.Description>
                    </List.Content>
                    </List.Item>
                </List>

                <Button color='green' icon='add' size='small' compact />
            </div>
        )
    }
}
