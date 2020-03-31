import React from 'react'
import { Header } from 'semantic-ui-react'

export default function AdminSettings() {
    return (
        <div style={{ padding: '2rem' }}>
            <Header as='h2' color='green'>Admin settings</Header>
            <p>Manage registered users on the website.</p>
        </div>
    )
}
