import React, { Component } from 'react'
import Page from './page'

export default class Application extends Component {
    render() {
        return (
            <>
                <Page title="Application"/>
                <p>Main app page.</p>
            </>
        )
    }
}