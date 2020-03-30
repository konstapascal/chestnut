import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class DeleteButton extends Component {

  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Button negative size='medium' onClick={this.open}>Delete Account</Button>
        <Confirm
          header='Account deletion'
          size='tiny'
          content='Are you sure you want to delete your account?'
          open={this.state.open}
          onCancel={this.close}
          onConfirm={this.close}
        />
      </div>
    )
  }
}

export default DeleteButton