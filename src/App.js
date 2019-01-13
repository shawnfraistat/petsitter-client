import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import EditProfile from './auth/components/EditProfile'

import CreateClientAcc from './auth/components/CreateClientAcc'
import CreateSitterAcc from './auth/components/CreateSitterAcc'

import ClientLanding from './client-view/ClientLanding'
import SitterLanding from './sitter-view/SitterLanding'

import LandingPage from './LandingPage'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  getUser = () => this.state.user

  setUser = user => {
    user = this.addUserVirtuals(user)
    console.log('inside setUser--after adding virtuals, user is', user)
    this.setState({ user })
  }

  // addUserVirtuals() determines what user is logged in as
  // and whether user has client/sitter accounts
  // specifically, sets booleans isSitter/isClient
  // and hasSitterAcc/hasClientAcc
  addUserVirtuals = user => {
    // console.log('inside add virtuals, user is', user)
    user.client ? user.hasClientAcc = true : user.hasClientAcc = false
    user.sitter ? user.hasSitterAcc = true : user.hasSitterAcc = false
    if (user.accountType === 'client') {
      user.isClient = true
      user.isSitter = false
    }
    if (user.accountType === 'sitter') {
      user.isSitter = true
      user.isClient = false
    }
    return user
  }

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  // <Route path='/client' render={() => {
  //   const user = this.state.user
  //   user.accountType = 'client'
  //   this.setState({ user: user })
  //   return (<ClientLanding flash={this.flash} setUser={this.setUser} />)
  // }} />
  // <Route path='/sitter' render={() => {
  //   const user = this.state.user
  //   user.accountType = 'sitter'
  //   this.setState({ user: user })
  //   return (<SitterLanding flash={this.flash} setUser={this.setUser} />)
  // }} />

  render () {
    const { flashMessage, flashType, user } = this.state
    console.log('user is', user)
    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">
          {/* Routes */}
          <Route exact path='/' component={LandingPage} />
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/client' render={() => (
            <ClientLanding flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sitter' render={() => (
            <SitterLanding flash={this.flash} setUser={this.setUser} />
          )} />
          {/* For some reason, changing CreateClientAcc and CreateSitterAccount Route to AuthenticatedRoute currently breaks them */}
          <Route path='/create-client-account' render={() => (
            <CreateClientAcc flash={this.flash} token={this.state.user.token} setUser={this.setUser} getUser={this.getUser} />
          )} />
          <Route path='/create-sitter-account' render={() => (
            <CreateSitterAcc flash={this.flash} token={this.state.user.token} setUser={this.setUser} getUser={this.getUser} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-profile' render={() => (
            <EditProfile flash={this.flash} clearUser={this.clearUser} getUser={this.getUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} getUser={this.getUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
