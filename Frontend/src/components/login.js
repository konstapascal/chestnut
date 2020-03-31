import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export default function LoginForm (){
  return(
    <Grid textAlign='center' style={{ height: '75vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='green' textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />

            <Button color='green' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          Don't have an account? <a href='/register'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  )
}
