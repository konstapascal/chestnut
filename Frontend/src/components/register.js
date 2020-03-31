import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

export default function RegisterForm() {
  return (
    <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='green' textAlign='center'>
          Register new user
        </Header>
        <Form size='large'>
          <Segment stacked padded>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm password'
              type='password'/>
            <Button color='green' fluid size='large'>
              Register
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  )
}