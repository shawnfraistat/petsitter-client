import React, { Component } from 'react'

class CreateClientAcc extends Component {
  constructor(props) {
    super()
    this.handleChange = props.handleChange
    if (props.user) {
      this.state = props.user
    }
  }

  render () {
    let about
    if (this.state) {
      about = this.state.client.about
    }

    return (
      <div>
        <label htmlFor="about">About You</label>
        <br />
        <textarea
          required
          name="about"
          placeholder="Description"
          value={about}
          onChange={this.handleChange}
          cols="65"
          rows="3"
        />
      </div>
    )
  }
}

export default CreateClientAcc
