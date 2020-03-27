import React, { Component } from 'react'
import Page from './page'
import { Button } from 'react-bootstrap'

export default class Settings extends Component {
    render() {
        return (
                <>
                  <Page title="Settings"/>
                  <Button variant="danger">Delete Account</Button>
                </>
              );
    }
}
