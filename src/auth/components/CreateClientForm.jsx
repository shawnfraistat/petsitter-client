import React, { Component } from 'react'

// CreateClientForm contains a form that takes in information used to create
// a sitter account for the current user; it's used by both CreateClientAcc and
// SignUp
class CreateClientForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = props.handleChange // used to bind input options to state of parent
  }

  render () {
    return (
      <div className="auth-form client-form">
        <label htmlFor="about">About You and Your Pets</label>
        <textarea
          required
          name="about"
          placeholder="Description"
          value={this.props.user && this.props.user.about}
          onChange={this.handleChange}
          cols="65"
          rows="3"
        />
      </div>
    )
  }
}

export default CreateClientForm
