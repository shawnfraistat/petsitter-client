import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn, getSitters, getZipDistance } from '../api'

import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      account_type: 'client'
    }
  }

  // canReachApi() is triggered if the app can reach the third party zip code API
  canReachApi = () => {
    const user = this.props.getUser()
    user.canReachApi = true
    this.props.setUser(user)
  }

  // cannotReachApi() is triggered if the app can't reach the third party zip code API
  // it hides the ability for clients to search by distance
  cannotReachApi = () => {
    const user = this.props.getUser()
    user.canReachApi = false
    this.props.setUser(user)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  // mapSitters() attempts to add distanceFromUser to each sitter by comparing
  // their zip code to the client's via a third party API
  mapSitters = async (res) => {
    const finishedSitters = await res
    finishedSitters.sitters.forEach(sitter => {
        getZipDistance(this.state.zip_code, sitter.user.zip_code)
          .then(res => res.json())
          .then(res => {
            console.log(res)
            return res
          })
          .then(res => sitter.distanceFromUser = Math.ceil(res.distance))
          .then(() => this.canReachApi())
          .catch(() => {
            console.error('oh snap!')
            this.cannotReachApi()
          })
    })
    return finishedSitters
  }

  signIn = event => {
    event.preventDefault()

    const { flash, history, setUser, getUser } = this.props

    signIn(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      // check to see if the user tried to sign into an account they don't have
      // if so, throw an error
      .then(res => {
        if ((this.state.account_type === 'client' && !(res.user.client)) || (this.state.account_type === 'sitter' && !(res.user.sitter))) {
          throw new Error()
        } else if (this.state.account_type === 'client' && res.user.client) {
          res.user.account_type = 'client'
        } else if (this.state.account_type === 'sitter' && res.user.sitter) {
          res.user.account_type = 'sitter'
        }
        setUser(res.user)
        this.setState(res.user)
      })
      .then(() => flash(messages.signInSuccess, 'flash-success'))
      // now get sitters from API
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
