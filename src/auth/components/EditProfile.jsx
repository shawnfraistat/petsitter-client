import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreateClientForm from './CreateClientForm'
import CreateSitterForm from './CreateSitterForm'

import { handleErrors, editUserProfile, updateClientAccount, updateSitterAccount } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'

import '../auth.scss'

class EditProfile extends Component {
  constructor (props) {
    super(props)

    const { user, setUser } = props
    const { client, sitter } = props.user

    this.state = user
  }

  // cleanObject() is a quick method for purging empty keys from objects,
  // courtesy of https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript
  cleanObject = obj => {
    for (const propName in obj) {
      if (obj[propName] === '' || obj[propName] === undefined || obj[propName] === null) {
        delete obj[propName]
      }
    }
    return obj
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleCheckBoxChange() is called when checkboxes are checked or unchecked
  // for the animal_types in the CreateSitterForm component
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

  editProfile = event => {
    event.preventDefault()

    const { flash, history, setUser } = this.props

    // zip code validation -- regexp courtesy of https://stackoverflow.com/questions/160550/zip-code-us-postal-code-validation
    if (this.state.zip_code) {
      const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zip_code)
      if (!(isValidZip)) {
        flash(messages.badZipCode, 'flash-error')
        return null
      }
    }

    if ((this.state.password || this.state.password_confirmation) && (this.state.password !== this.state.password_confirmation)) {
      flash(messages.mismatchingPasswords, 'flash-error')
      return null
    }

    const data = this.cleanObject(this.state)
    console.log('inside editProfile, clean data is', data)

    editUserProfile(data)
      .then(handleErrors)
      .then(res => res.json())
      .then(() => this.state.account_type === 'client' ? updateClientAccount(data) : updateSitterAccount(data))
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        res.user.token = this.state.token
        res.user.account_type = this.state.account_type
        setUser(res.user)
      })
      .then(() => {
        this.props.user.account_type === 'client' ? history.push('/client') : history.push('/sitter')
      })
      .then(() => flash(messages.editProfileSuccess, 'flash-success'))
      .catch(() => flash(messages.editProfileFailure, 'flash-error'))
  }

  render () {
    const { email, password, password_confirmation, account_type, zip_code } = this.state

    return (
      <form className='auth-form' onSubmit={this.editProfile}>
        <h3>Edit Profile</h3>

        <label htmlFor="email">Change Email</label>
        <input
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Change Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <label htmlFor="password_confirmation">Confirm New Password</label>
        <input
          name="password_confirmation"
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <label htmlFor="zip_code">Enter Zip Code</label>
        <input
          name="zip_code"
          value={zip_code}
          type="text"
          maxLength="5"
          placeholder="Zip Code"
          onChange={this.handleChange}
        />
        {/* Since I've commented this out, user can only edit whichever account they're currently on
        <label htmlFor="account_type">Choose Account to Edit</label>
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
        </div> */}
        { account_type === 'client'
          ? <CreateClientForm handleChange={this.handleChange} user={this.state} />
          : <CreateSitterForm handleChange={this.handleChange} handleCheckBoxChange={this.handleCheckBoxChange} user={this.state} /> }
        <button type="submit">Submit Changes</button>
      </form>

    )
  }
}

export default withRouter(EditProfile)
