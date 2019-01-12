import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreateClientForm from './CreateClientForm'
import CreateSitterForm from './CreateSitterForm'

import { handleErrors, editProfile } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import '../auth.scss'

class EditProfile extends Component {
  constructor (props) {
    super(props)

    this.state = props.user
    console.log(this.state)
    // this.state = {
    //   email: '',
    //   password: '',
    //   passwordConfirmation: '',
    //   accountType: 'client',
    //   zipCode: '',
    //   about: '',
    //   price: 0,
    //   distance: 0,
    //   animalTypes: ''
    // }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleCheckBoxChange() is called when checkboxes are checked or unchecked
  // for the animalTypes in the CreateSitterForm component
  // it keeps them stored as a space-separated string,
  // purging and adding as appropriate
  handleCheckBoxChange = event => {
    const animalArray = this.state.animalTypes.split(' ')
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

  editProfile = event => {
    event.preventDefault()

    // const { email, password, passwordConfirmation, accountType, zipCode, about }  = this.state
    const { flash, history, setUser } = this.props
    console.log(this.state)

    editProfile(this.state)
      .then(handleErrors)
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => setUser(res.user))
      .then(() => {
        this.props.user.accountType === 'client' ? history.push('/client') : history.push('/sitter')
      })
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render () {
    const { email, password, passwordConfirmation, accountType, zipCode, about } = this.state

    return (
      <form className='auth-form' onSubmit={this.signUp}>
        <h3>Edit Profile</h3>

        <label htmlFor="email">Change Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Change Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <label htmlFor="passwordConfirmation">Confirm New Password</label>
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
        <label htmlFor="accountType">Choose Account to Edit</label>
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
        <button type="submit">Submit Changes</button>
      </form>

    )
  }
}

export default withRouter(EditProfile)
