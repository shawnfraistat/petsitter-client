import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreateClientForm from './CreateClientForm'

import { handleErrors, createClientAccount } from '../api'
import messages from '../messages'
import '../auth.scss'

// CreateClientAcc is called by the "Create Client Account" option in the nav menu
// its job is to collect the user input information for a new client account, and
// then send that data to the server
class CreateClientAcc extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token,
      about: ''
    }
  }

  // createClientAccount() is the method that passes client info the server;
  // it then switches the user to the client view
  createClientAccount = event => {
    event.preventDefault()

    const { flash, history, setUser, getUser } = this.props

    createClientAccount(this.state)
      .then(handleErrors)
      .then(res => res.json())

      .then(res => {
        const user = getUser()
        user.account_type = 'client' // switch the current user over to using the site as a client
        user.client = res.client // update the current user with the client data returned from API
        setUser(user)
      })
      // redirect the user to ClientLanding
      .then(() => history.push('/client'))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  // this is used to bind the form elements to this component's state
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <form className='auth-form' onSubmit={this.createClientAccount}>
        <h3>Create Client Account</h3>
        <CreateClientForm handleChange={this.handleChange} />
        <button type="submit">Create Client Account</button>
      </form>
    )
  }
}

export default withRouter(CreateClientAcc)
