import React from 'react'
import DeleteButton from './delete.button'
import { Header } from 'semantic-ui-react'

export default function Settings () {
  return (
          <div style={{ padding: '2rem' }}>
            <Header as='h2' color='green'>Account settings</Header>
            <p>Upon deletion, any related information about the user will be removed from the database.</p>
            <DeleteButton />
          </div>
        );
}