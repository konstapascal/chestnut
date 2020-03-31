import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Error() {
    return (
        <div style={{ padding: '2rem' }}>
            <Header as='h2' color='green'>404 - Not Found.</Header>
            <p>Requested URL could not be found.</p>
            <Button content='Go back' color='green' compact as={Link} to='/' />
        </div>
    )
}
