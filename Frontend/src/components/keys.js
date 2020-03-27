import React, { Component } from 'react'
import Page from './page'

export default class Keys extends Component {
    render() {
        return (
            <>
                <Page title="Keys"/>
                <p>Functionalities to implement:</p>
                <ul>
                    <li>View keypairs</li>
                    <li>Generate, import, delete keypairs</li>
                </ul>
            </>
        )
    }
}
