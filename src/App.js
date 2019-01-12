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

  // complicate setUser to determine what user is logged in as
  // and whether user has client/sitter accounts
  // specifically, need to set booleans isSitter/isClient
  // and hasSitterAcc/hasClientAcc
  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

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
            <CreateClientAcc flash={this.flash} token={this.state.user.token} setUser={this.setUser} />
          )} />
          <Route path='/create-sitter-account' render={() => (
            <CreateSitterAcc flash={this.flash} token={this.state.user.token} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-profile' render={() => (
            <EditProfile flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
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
