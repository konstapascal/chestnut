import React, { Component } from 'react'
import ApplicationMenu from './app.menu'

export default class Application extends Component {
    render() {
        return (
            <>
                <h3>Main application page</h3>
                <p>Choose one of the following algorithms and desired action to go further:</p>
                <ApplicationMenu />
            </>
        )
    }
}