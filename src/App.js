import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import Footer from './footer/Footer'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
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
    this.setState({ user })
  }

  // addUserVirtuals() determines what user is logged in as
  // and whether user has client/sitter accounts
  // specifically, sets booleans isSitter/isClient
  // and hasSitterAcc/hasClientAcc
  addUserVirtuals = user => {
    user.client ? user.hasClientAcc = true : user.hasClientAcc = false
    user.sitter ? user.hasSitterAcc = true : user.hasSitterAcc = false
    if (user.account_type === 'client') {
      user.isClient = true
      user.isSitter = false
    }
    if (user.account_type === 'sitter') {
      user.isSitter = true
      user.isClient = false
    }
    if (user.client && user.isClient) {
      user.about = user.client.about
    }
    if (user.sitter && user.isSitter) {
      user.about = user.sitter.about
      user.price = user.sitter.price
      user.service_range = user.sitter.service_range
      user.animal_types = user.sitter.animal_types
      user.cats = user.sitter.animal_types.search('cats') !== -1
      user.dogs = user.sitter.animal_types.search('dogs') !== -1
      user.reptiles = user.sitter.animal_types.search('reptiles') !== -1
      user.birds = user.sitter.animal_types.search('birds') !== -1
      user.fish = user.sitter.animal_types.search('fish') !== -1
      user.rabbits = user.sitter.animal_types.search('rabbits') !== -1
      user.rodents = user.sitter.animal_types.search('rodents') !== -1
      user.equines = user.sitter.animal_types.search('equines') !== -1
      user.plants = user.sitter.animal_types.search('plants') !== -1
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

  render () {
    const { flashMessage, flashType, user } = this.state
    return (
      <React.Fragment>
        <Header user={user} getUser={this.getUser} setUser={this.setUser}/>
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container main-container">
          {/* Routes */}
          <Route exact path='/' component={LandingPage} />
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/client' render={() => (
            <ClientLanding flash={this.flash} setUser={this.setUser} user={user} />
          )} />
          <Route path='/sitter' render={() => (
            <SitterLanding flash={this.flash} setUser={this.setUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-client-account' render={() => (
            <CreateClientAcc flash={this.flash} token={this.state.user.token} setUser={this.setUser} getUser={this.getUser} />
          )} />
          <AuthenticatedRoute user={user} path='/create-sitter-account' render={() => (
            <CreateSitterAcc flash={this.flash} token={this.state.user.token} setUser={this.setUser} getUser={this.getUser} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-profile' render={() => (
            <EditProfile flash={this.flash} clearUser={this.clearUser} setUser={this.setUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} getUser={this.getUser} user={user} />
          )} />
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App
