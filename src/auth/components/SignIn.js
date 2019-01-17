import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      account_type: 'client'
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signIn = event => {
    event.preventDefault()

    const { flash, history, setUser } = this.props

    console.log('inside signIn, this.state is', this.state)
    signIn(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(res => {
        console.log('inside signIn, res is', res)
        return res
      })
      .then(res => {
        if (this.state.account_type === 'client' && res.user.client) {
          res.user.account_type = 'client'
        } else if (this.state.account_type === 'sitter' && res.user.sitter) {
          res.user.account_type = 'sitter'
        }
        setUser(res.user)
      })
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      .then(() => {
        this.state.account_type === 'client' ? history.push('/client') : history.push('/sitter')
      })
      .catch(() => flash(messages.signInFailure, 'flash-error'))
  }

  render () {
    const { email, password } = this.state

    return (
      <form className='auth-form' onSubmit={this.signIn}>
        <h3>Sign In</h3>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <label htmlFor="account_type">Sign In As</label>
        <div onChange={this.handleChange}>
          <input
            defaultChecked
            className="account-radio"
            name="account_type"
            value="client"
            type="radio"
          />Client
          <input
            className="account-radio"
            name="account_type"
            value="sitter"
            type="radio"
          />Sitter
        </div>
        <button type="submit">Sign In</button>
      </form>
    )
  }
}

export default withRouter(SignIn)
