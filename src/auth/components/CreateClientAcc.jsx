import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreateClientForm from './CreateClientForm'
import { handleErrors, createClientAccount } from '../api'

import messages from '../messages'
import apiUrl from '../../apiConfig'

import '../auth.scss'

class CreateClientAcc extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token,
      about: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  createClientAccount = event => {
    event.preventDefault()

    const { flash, history, setUser } = this.props
    console.log(this.state)

    createClientAccount(this.state)
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => history.push('/client'))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
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
