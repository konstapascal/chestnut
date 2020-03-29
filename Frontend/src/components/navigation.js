import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import logo from '../images/chestnut.png'

export default class Navigation extends Component {
    
    state = {}
    handleItemClick = ( { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
    
        return (
          <Menu color='green' stackable inverted attached='top'>
            <Menu.Item>
              <img src={logo} alt=''/>
            </Menu.Item>

            <Menu.Item
              as={ NavLink } exact to='/'
              name='Home'
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
              name='Settings'
              active={activeItem === 'settings'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              position= 'right'
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
          </Menu> 
        )
    }
}