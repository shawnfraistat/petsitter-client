import React, { Component } from 'react'
import { index } from './api'

class ClientLanding extends Component {
  constructor(props) {
    super(props)
    this.state = props.user
    index(this.state)
      .then(res => res.json())
      .then(res => this.setState({ sitterList: res.sitters }))
  }

  render () {
    console.log(this.state.sitterList)
    return (
      <div>
        <h1>You reached the client page</h1>
        {this.state.sitterList && this.state.sitterList.map((sitter, index) => (
          <div key={index}>
            <p>Email: {sitter.user.email}</p>
            <p>Price: {sitter.price}</p>
            <p>Service Range: {sitter.service_range}</p>
            <p>Pets Sat: {sitter.animal_types}</p>
            <hr />
          </div>
        ))}
      </div>

    )
  }
}

export default ClientLanding
