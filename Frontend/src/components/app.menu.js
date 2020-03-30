import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class ApplicationMenu extends Component {
  
  state = { activeItem: '' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <Menu secondary color='green' compact>
        <Menu.Item
            as={ NavLink } exact to='/'
            name='RSA'
            active={activeItem === 'rsa'}
            onClick={this.handleItemClick}
        />
        <Menu.Item
            as={ NavLink } exact to='/'
            name='AES'
            active={activeItem === 'aes'}
            onClick={this.handleItemClick}
        />
        <Menu.Item
            as={ NavLink } exact to='/'
            name='Base 64'
            active={activeItem === 'base64'}
            onClick={this.handleItemClick}
        />
        <Menu.Item
            as={ NavLink } exact to='/'
            name='Checksum'
            active={activeItem === 'checksum'}
            onClick={this.handleItemClick}
        />
        <Menu.Item
            as={ NavLink } exact to='/'
            name='ROT'
            active={activeItem === 'rot'}
            onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}