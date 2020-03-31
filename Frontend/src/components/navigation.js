import React, { Component } from 'react'
import { Menu, MenuItem } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../images/chestnut.png'
import DarkModeButton from './dark.mode.button'
import LanguageButton from './language.button'

export default class Navigation extends Component {
    
    state = { activeItem: '' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
    
        return (
          <Menu color='green' stackable inverted borderless compact attached='top'>
            <Menu.Item  as={ Link } exact to='/' >
              <img src={logo} alt=''/>
            </Menu.Item>

            <Menu.Item
              as={ NavLink } exact to='/'
              name='Application Page'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ NavLink } exact to='/keys'
              name='My Keys'
              active={activeItem === 'keys'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ NavLink } exact to='/users'
              name='Search Users'
              active={activeItem === 'users'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ NavLink } exact to='/settings'
              name='Account Settings'
              active={activeItem === 'settings'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ NavLink } exact to='/adminsettings'
              name='Admin Settings'
              active={activeItem === 'adminsettings'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={ NavLink } exact to='/register'
              name='Register'
              active={activeItem === 'register'}
              onClick={this.handleItemClick}>
            </Menu.Item>
            <Menu.Item
              as={ NavLink } exact to='/login'
              name='Login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
            <MenuItem position='right'>
              <DarkModeButton />
            </MenuItem>
            <MenuItem>
              <LanguageButton />
            </MenuItem>
          </Menu> 
        )
    }
}