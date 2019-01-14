import React, { Component } from 'react'
import { index } from './api'

import SitterPreview from './SitterPreview'

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
        {this.state.sitterList && this.state.sitterList.map((sitter, index) => (<SitterPreview key={index} sitter={sitter} />))}
      </div>
    )
  }
}

export default ClientLanding
