import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import papaParse from 'papaparse'

import CreateClientForm from './CreateClientForm'
import CreateSitterForm from './CreateSitterForm'

import { handleErrors, editUserProfile, updateClientAccount, updateSitterAccount } from '../api'
import messages from '../messages'
import '../auth.scss'

class EditProfile extends Component {
  constructor (props) {
    super(props)

    // load user data into this component's state
    this.state = props.getUser()

    // load a list of valid U.S. zip codes into this component's state
    // do so by using papaParse to parse a CSV file containing a list of zip
    // codes
    const zipCodePath = require('../../zip_code_database.csv')
    papaParse.parse(zipCodePath, {
      download: true,
      complete: (results) => {
        this.setState({ zipList: results.data })
      }
    })
  }

  // cleanFormData() iterates through FormData passed to it, deleting entries
  // with empty values
  cleanFormData = formData => {
    for(const pair of formData.entries()) {
      !(pair[1]) && formData.delete(pair[0])
    }
    return formData
  }

  // editProfile() collects the form data the user's inputted and sends it to
  // the API to update their user account info (and client or sitter info, if
  // they chose to update that as well)
  editProfile = event => {
    event.preventDefault()

    const { flash, history, setUser } = this.props

    // validate the zip code the user has entered; compare it against the list
    // of valid U.S. zip codes loaded into this.state.zipList
    if (this.state.zip_code) {
      let isValidZip = false
      for (let i = 0; i < this.state.zipList.length; i++) {
        if (this.state.zipList[i][0] === this.state.zip_code) {
          isValidZip = true
        }
      }
      if (!(isValidZip)) {
        flash(messages.badZipCode, 'flash-error')
        return null
      }
    }

    // if new password is entered, make sure it matches password confirmation
    if ((this.state.password || this.state.password_confirmation) && (this.state.password !== this.state.password_confirmation)) {
      flash(messages.mismatchingPasswords, 'flash-error')
      return null
    }

    // create a FormData object from the form; append a file if the user has
    // uploaded one
    const formData = new FormData(event.target)
    if (this.state.file) {
      formData.append('image', this.state.file)
    }

    // use cleanFormData() to delete entries with empty values (if the submits a
    // form with empty fields, assume the user didn't want to update those
    // fields; clean formData so we don't overwrite them)
    const purgedFormData = this.cleanFormData(formData)

    // now send the user data and the form data to the API
    editUserProfile(this.state, purgedFormData)
      .then(handleErrors)
      .then(res => res.json())
      // want to save the updated user we receive back from API
      // but first make sure the token isn't overwritten, because the API will
      // send it back scrambled
      .then(res => {
        res.user.token = this.state.token
        setUser(res.user)
        this.setState(res.user)
      })
      // try to update the user's client or sitter account too (depending on
      // which the user is currently logged in as)
      .then(() => this.state.account_type === 'client' ? updateClientAccount(this.state) : updateSitterAccount(this.state))
      .then(handleErrors)
      .then(res => res.json())
      // update the user data stored locally with the sitter/client info that's
      // returned from API
      .then(res => {
        const user = this.state
        user.client = res.user.client
        user.sitter = res.user.sitter
        setUser(user)
        this.setState(user)
      })
      // redirect the user to the ClientLanding or SitterLanding (depending on
      // which they're currently logged in as)
      .then(() => {
        this.props.user.account_type === 'client' ? history.push('/client') : history.push('/sitter')
      })
      .then(() => flash(messages.editProfileSuccess, 'flash-success'))
      .catch(() => flash(messages.editProfileFailure, 'flash-error'))
  }

  // handleChange() binds input fields to this.state
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

  // handleFile() stores an uploaded file to this component's state
  // this makes it easy to append it to the FormData that'll be sent to API
  handleFile = event => {
    this.setState({
      file: event.target.files[0]
    })
  }

  render () {
    const { email, name, password, password_confirmation, account_type, zip_code } = this.state

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
        <label htmlFor="name">Change Your Name</label>
        <input
          name="name"
          value={name}
          type="text"
          placeholder="Name"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Change Password</label>
        <input
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <label htmlFor="password_confirmation">Confirm New Password</label>
        <input
          name="password_confirmation"
          value={password_confirmation}
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
        <label htmlFor="file">Upload Profile Picture</label>
        <input
          type="file"
          placeholder="File"
          onChange={this.handleFile}
        />
        { account_type === 'client'
          ? <CreateClientForm handleChange={this.handleChange} user={this.state} />
          : <CreateSitterForm handleChange={this.handleChange} handleCheckBoxChange={this.handleCheckBoxChange} user={this.state} /> }
        <button type="submit">Submit Changes</button>
      </form>

    )
  }
}

export default withRouter(EditProfile)
