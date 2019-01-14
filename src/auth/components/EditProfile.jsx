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

    const { user } = props
    const { client, sitter } = props.user

    this.state = user

    if (user.accountType === 'client') {
      this.state.about = client.about
    } else if (user.accountType === 'sitter') {
      this.state.about = sitter.about
      this.state.price = sitter.price
      this.state.service_range = sitter.service_range
      this.state.animal_types = sitter.animal_types
      this.state.cats = sitter.animal_types.search('cats') !== -1
      this.state.dogs = sitter.animal_types.search('dogs') !== -1
      this.state.reptiles = sitter.animal_types.search('reptiles') !== -1
      this.state.birds = sitter.animal_types.search('birds') !== -1
      this.state.fish = sitter.animal_types.search('fish') !== -1
      this.state.rabbits = sitter.animal_types.search('rabbits') !== -1
      this.state.rodents = sitter.animal_types.search('rodents') !== -1
      this.state.equines = sitter.animal_types.search('equines') !== -1
      this.state.plants = sitter.animal_types.search('plants') !== -1
    }
    console.log('inside edit profile, this.state is', this.state)
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

    // const { email, password, passwordConfirmation, accountType, zip_code, about }  = this.state
    const { flash, history, setUser } = this.props
    console.log(this.state)

    editProfile(this.state)
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
    const { email, password, passwordConfirmation, accountType, zip_code, about } = this.state

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
        <label htmlFor="passwordConfirmation">Confirm New Password</label>
        <input
          name="passwordConfirmation"
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <label htmlFor="zip_code">Enter Zip Code</label>
        <input
          name="zip_code"
          value={zip_code}
          type="text"
          placeholder="Zip Code"
          onChange={this.handleChange}
        />
        {/* By commenting this out, user can only edit whichever account they're currently on
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
        </div> */}
        { accountType === 'client'
          ? <CreateClientForm handleChange={this.handleChange} user={this.state} />
          : <CreateSitterForm handleChange={this.handleChange} handleCheckBoxChange={this.handleCheckBoxChange} user={this.state} /> }
        <button type="submit">Submit Changes</button>
      </form>

    )
  }
}

export default withRouter(EditProfile)
