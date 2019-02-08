import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

// display components
import Footer from './footer/Footer'
import Header from './header/Header'
import LandingPage from './LandingPage'

// auth components
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import CreateClientAcc from './auth/components/CreateClientAcc'
import CreateSitterAcc from './auth/components/CreateSitterAcc'
import EditProfile from './auth/components/EditProfile'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import SignUp from './auth/components/SignUp'

// client-view component
import ClientLanding from './client-view/ClientLanding'

// sitter-view component
import SitterLanding from './sitter-view/SitterLanding'

// message-center components
import MessageCenter from './message-center/MessageCenter'
import ExchangeView from './message-center/ExchangeView'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  // addUserVirtuals() determines what user is logged in as and whether user has
  // client/sitter accounts; specifically, sets booleans isSitter/isClient
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

  // clearUser() is used to clear current user data--useful for when the user
  // signs out
  clearUser = () => this.setState({ user: null })

  // flash() is method for displaying success and error messages to the user
  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 3000)
  }

  // getUser() defines a getter method for App's this.state.user; this is passed
  // down to subordinate components and used to get current user data
  getUser = () => this.state.user

  // setUser() defines a setter method for App's this.state.user; this is passed
  // down to subordinate components and used to set current user data
  setUser = user => {
    user = this.addUserVirtuals(user)
    this.setState({ user })
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
            <SignUp flash={this.flash} setUser={this.setUser} getUser={this.getUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} getUser={this.getUser} />
          )} />
          <Route path='/client' render={() => (
            <ClientLanding flash={this.flash} getUser={this.getUser} setUser={this.setUser} user={user} />
          )} />
          <Route path='/sitter' render={() => (
            <SitterLanding flash={this.flash} setUser={this.setUser} user={user} />
          )} />
          <Route path='/message-center' render={() => (
            <MessageCenter flash={this.flash} setUser={this.setUser} getUser={this.getUser} user={user} />
          )} />
          <Route path='/exchange' render={() => (
            <ExchangeView flash={this.flash} setUser={this.setUser} getUser={this.getUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-client-account' render={() => (
            <CreateClientAcc flash={this.flash} token={this.state.user.token} setUser={this.setUser} getUser={this.getUser} />
          )} />
          <AuthenticatedRoute user={user} path='/create-sitter-account' render={() => (
            <CreateSitterAcc flash={this.flash} token={this.state.user.token} setUser={this.setUser} getUser={this.getUser} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-profile' render={() => (
            <EditProfile flash={this.flash} clearUser={this.clearUser} getUser={this.getUser} setUser={this.setUser} user={user} />
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
