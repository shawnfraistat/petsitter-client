import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import CreateSitterForm from './CreateSitterForm'
import { handleErrors, createSitterAccount } from '../api'

import messages from '../messages'

import '../auth.scss'

class CreateSitterAcc extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token,
      about: '',
      animal_types: '',
      service_range: '',
      price: '',
    }
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

  createSitterAccount = event => {
    event.preventDefault()

    const { flash, history, setUser, getUser } = this.props

    createSitterAccount(this.state)
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        const user = getUser()
        user.account_type = 'sitter'
        user.sitter = res.sitter
        setUser(user)
      })
      .then(() => history.push('/sitter'))
      .then(() => flash(messages.signUpSuccess, 'flash-success'))
      .catch(() => flash(messages.signUpFailure, 'flash-error'))
  }

  render () {
    return (
      <form className='auth-form' onSubmit={this.createSitterAccount}>
        <h3>Create Sitter Account</h3>
        <CreateSitterForm handleChange={this.handleChange} handleCheckBoxChange={this.handleCheckBoxChange} />
        <button type="submit">Create Sitter Account</button>
      </form>
    )
  }
}

export default withRouter(CreateSitterAcc)
