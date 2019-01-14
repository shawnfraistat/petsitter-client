import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreateClientForm from './CreateClientForm'
import CreateSitterForm from './CreateSitterForm'

import { handleErrors, signUp, signIn, createClientAccount, createSitterAccount } from '../api'
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
      animal_types: '',
      zip_code: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleCheckBoxChange() is called when checkboxes are checked or unchecked
  // for the animal_types in the CreateSitterAcc component
  // it keeps them stored as a space-separated string,
  // purging and adding as appropriate
  handleCheckBoxChange = event => {
    const animalArray = this.state.animal_types.split(' ')
    const animalName = event.target.value
    if (event.target.checked) {
      animalArray.push(animalName)
    } else {
      const index = animalArray.indexOf(animalName)
      animalArray.splice(index, 1)
    }
    this.setState({
      [event.target.name]: animalArray.join(' ').trim()
    })
  }

  signUp = event => {
    event.preventDefault()

    const { flash, history, setUser, getUser } = this.props
    console.log(this.state)

    signUp(this.state)
      .then(handleErrors)
      // after signing up, sign in
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      // after signing in, save the returned token and create a client or sitter account
      .then((res) => {
        console.log('inside signUp, about to try to create a client or sitter account')
        this.setState({ token: res.user.token })
        return this.state.accountType === 'client' ? createClientAccount(this.state) : createSitterAccount(this.state)
      })
      // after creating a new sitter or client account, update the user so that they're on the right view
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        console.log('inside signup, after creating an account, this.state is', this.state)
        const user = this.state
        user.accountType === 'client' ? user.client = res.client : user.sitter = res.sitter
        console.log('after trying to user.client to res, user is', user)
        return user
      })
      // now actually send the user to the right view
      .then((user) => {
        setUser(user)
        this.state.accountType === 'client' ? history.push('/client') : history.push('/sitter')
      })
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render () {
    const { email, password, passwordConfirmation, accountType, zip_code, about } = this.state

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
        <label htmlFor="zip_code">Enter Zip Code</label>
        <input
          required
          name="zip_code"
          value={zip_code}
          type="text"
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
        { accountType === 'client'
          ? <CreateClientForm handleChange={this.handleChange} />
          : <CreateSitterForm handleChange={this.handleChange} handleCheckBoxChange={this.handleCheckBoxChange} /> }
        <button type="submit">Sign Up</button>
      </form>

    )
  }
}

export default withRouter(SignUp)
