import React, { Component } from 'react'

class CreateClientAcc extends Component {
  constructor(props) {
    super(props)
    this.handleChange = props.handleChange
  }

  render () {
    return (
      <div>
        <label htmlFor="about">About You and Your Pets</label>
        <br />
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
