import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreateClientForm from './CreateClientForm'
import CreateSitterForm from './CreateSitterForm'

import { createClientAccount, createSitterAccount, getFavorites, getSitters, getZipDistance, handleErrors, signIn, signUp } from '../api'
import messages from '../messages'

import '../auth.scss'

import papaParse from 'papaparse'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      account_type: 'client',
      animal_types: '',
      zip_code: ''
    }

    const zipCodePath = require('../../zip_code_database.csv')

    papaParse.parse(zipCodePath, {
      download: true,
      complete: (results) => {
        this.setState({ zipList: results.data })
      }
    })
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

  handleFile = event => {
    this.setState({
      file: event.target.files[0]
    })
  }

  // mapSitters() attempts to add distanceFromUser to each sitter by comparing
  // their zip code to the client's via a third party API
  // if it can't reach the third party API, it triggers this.cannotReachApi()
  mapSitters = async (res) => {
    const finishedSitters = await res
    finishedSitters.sitters.forEach(sitter => {
        getZipDistance(this.state.zip_code, sitter.user.zip_code)
          .then(res => res.json())
          .then(res => sitter.distanceFromUser = Math.ceil(res.distance))
          .catch(this.cannotReachApi)
    })
    return finishedSitters
  }


  signUp = event => {
    event.preventDefault()

    const { flash, history, getUser, setUser } = this.props

    // zip code validation
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

    if ((this.state.password || this.state.password_confirmation) && (this.state.password !== this.state.password_confirmation)) {
      flash(messages.mismatchingPasswords, 'flash-error')
      return null
    }

    const formData = new FormData(event.target)
    if (this.state.file) {
      formData.append('image', this.state.file)
    }

    signUp(formData)
      .then(handleErrors)
      // after signing up, sign in
      .then(() => signIn(this.state))
      .then(handleErrors)
      .then(res => res.json())
      // after signing in, save the returned token and create a client or sitter account
      .then((res) => {
        this.setState({ token: res.user.token })
        this.setState({ image: res.user.image })
        return this.state.account_type === 'client' ? createClientAccount(this.state) : createSitterAccount(this.state)
      })
      // after creating a new sitter or client account, update the user so that they're on the right view
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        const user = this.state
        user.account_type === 'client' ? user.client = res.client : user.sitter = res.sitter
        setUser(user)
      })
      // now get sitters from the API
      .then(() => getSitters(this.state))
      // convert the API response to JSON
      .then(res => res.json())
      // get the distance from the user for each sitter in the response data
      .then(res => {
        res = this.mapSitters(res)
        return res
      })
      //  update the user with sitters list
      .then(async (res) => {
        const sitterList = await res
        const currentUser = getUser()
         currentUser.sitterList = sitterList.sitters
         setUser(currentUser)
      })
      // now actually send the user to the right view
      .then(() => {
        this.state.account_type === 'client' ? history.push('/client') : history.push('/sitter')
      })
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render () {
    const { email, password, password_confirmation, account_type, zip_code } = this.state

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
        <label htmlFor="password_confirmation">Confirm Password</label>
        <input
          required
          name="password_confirmation"
          value={password_confirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <label htmlFor="zip_code">Enter Zip Code</label>
        <input
          required
          name="zip_code"
          maxLength="5"
          value={zip_code}
          type="text"
          placeholder="Zip Code"
          onChange={this.handleChange}
        />
        <label htmlFor="file">Upload Profile Picture</label>
        <input
          type="file"
          placeholder="File"
          onChange={this.handleFile}
        />
        <label htmlFor="account_type">Choose Account Type</label>
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
        { account_type === 'client'
          ? <CreateClientForm handleChange={this.handleChange} />
          : <CreateSitterForm handleChange={this.handleChange} handleCheckBoxChange={this.handleCheckBoxChange} /> }
        <button type="submit">Sign Up</button>
      </form>

    )
  }
}

export default withRouter(SignUp)
