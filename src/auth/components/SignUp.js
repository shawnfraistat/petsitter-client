import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, signUp, signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import '../auth.scss'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      accountType: 'client',
      zipCode: ''
    }
  }

  handleChange = event => {
    // console.log(event)
    this.setState({
      [event.target.name]: event.target.value
    })
    // console.log(this.state)
  }

  signUp = event => {
    event.preventDefault()

    const { email, password, passwordConfirmation, accountType, zipCode }  = this.state
    const { flash, history, setUser } = this.props
    console.log(this.state)

    signUp(this.state)
      .then(handleErrors)
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .then(() => history.push('/'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render () {
    const { email, password, passwordConfirmation, accountType, zipCode } = this.state

    return (
      <form className='auth-form' onSubmit={this.signUp}>
        <h3>Sign Up</h3>

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
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
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <label htmlFor="zipCode">Enter Zip Code</label>
        <input
          required
          name="zipCode"
          value={zipCode}
          type="number"
          placeholder="Zip Code"
          onChange={this.handleChange}
        />
        <label htmlFor="accountType">Choose Account Type</label>
        <div onChange={this.handleChange}>
          <input
            defaultChecked
            className="account-radio"
            name="accountType"
            value="client"
            type="radio"
          />Client
          <input
            className="account-radio"
            name="accountType"
            value="sitter"
            type="radio"
          />Sitter
        </div>
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
