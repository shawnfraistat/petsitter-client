import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreateClientForm from './CreateClientForm'
import CreateSitterForm from './CreateSitterForm'

import { createClientAccount, createSitterAccount, getSitters, getZipDistance, handleErrors, signIn, signUp } from '../api'
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
      name: '',
      zip_code: ''
    }

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

  // cannotReachApi() is triggered if the app can't reach the third party zip code API
  // it hides the ability for clients to search by distance
  cannotReachApi = () => {
    const user = this.props.getUser()
    user.canReachApi = false
    this.props.setUser(user)
  }

  // canReachApi() is triggered if the app can reach the third party zip code API
  canReachApi = () => {
    const user = this.props.getUser()
    user.canReachApi = true
    this.props.setUser(user)
  }

  // handleChange() binds input fields to this.state
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

  // handleFile() stores an uploaded file to this component's state
  // this makes it easy to append it to the FormData that'll be sent to API
  handleFile = event => {
    this.setState({
      file: event.target.files[0]
    })
  }

  // mapSitters() attempts to add distanceFromUser to each sitter by comparing
  // their zip code to the client's via a third party API
  mapSitters = async (res) => {
    const finishedSitters = await res
    finishedSitters.sitters.forEach(sitter => {
        getZipDistance(this.state.zip_code, sitter.user.zip_code)
          .then(res => res.json())
          .then(res => {
            if (res.error_code) throw res.error_msg
            return res
          })
          .then(res => sitter.distanceFromUser = Math.ceil(res.distance))
          .then(this.canReachApi)
          .catch(this.cannotReachApi)
    })
    return finishedSitters
  }

  // signUp() sends the data to the API and deals with the response
  signUp = event => {
    event.preventDefault()

    const { flash, history, getUser, setUser } = this.props

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

    // make sure password matches password confirmation
    if ((this.state.password || this.state.password_confirmation) && (this.state.password !== this.state.password_confirmation)) {
      flash(messages.mismatchingPasswords, 'flash-error')
      return null
    }

    // create a FormData object; append values taken from form
    const formData = new FormData()
    formData.append('email', this.state.email)
    formData.append('name', this.state.name)
    formData.append('password', this.state.password)
    formData.append('password_confirmation', this.state.password_confirmation)
    formData.append('zip_code', this.state.zip_code)

    // append a file to formData if the user has uploaded one
    if (this.state.file) {
      formData.append('image', this.state.file)
    }

    // now send data to API and handle response
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
    const { email, name, password, password_confirmation, account_type, zip_code } = this.state

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
        <label htmlFor="name">Your Name</label>
        <input
          required
          name="name"
          value={name}
          placeholder="Name"
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
