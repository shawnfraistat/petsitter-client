import React, { Component } from 'react'

class CreateClientAcc extends Component {
  constructor(props) {
    super()
    this.handleChange = props.handleChange
  }

  render () {
    return (
      <div>
        <label htmlFor="about">About You</label>
        <br />
        <textarea
          required
          name="about"
          placeholder="Description"
          onChange={this.handleChange}
          cols="65"
          rows="3"
        />
      </div>
    )
  }
}

export default CreateClientAcc
