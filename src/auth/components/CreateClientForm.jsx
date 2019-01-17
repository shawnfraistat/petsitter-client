import React, { Component } from 'react'

class CreateClientAcc extends Component {
  constructor(props) {
    super(props)
    this.handleChange = props.handleChange
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

export default CreateClientAcc
