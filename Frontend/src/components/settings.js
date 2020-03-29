import React, { Component } from 'react'
import Page from './page'
import DeleteButton from './delete.button'

export default class Settings extends Component {
    render() {
        return (
                <>
                  <Page title="Settings"/>
                  <DeleteButton />
                </>
              );
    }
}
