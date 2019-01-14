import React, { Component } from 'react'
import { index } from './api'

import SitterPreview from './SitterPreview'
import SearchBar from './SearchBar'

import './client-view.scss'

class ClientLanding extends Component {
  constructor(props) {
    super(props)
    this.state = props.user
    this.state.searchOpts = {
      service_range: 5,
      price: 20,
      animal_types: ''
    }
    index(this.state)
      .then(res => res.json())
      .then(res => this.setState({ sitterList: res.sitters }))
  }

  handleOptsChange = event => {
    const opts = searchOpts[event.target.name]
    this.setState({
      [searchOpts]: event.target.value
    })
  }
  render () {
    return (
      <div className='client-view-main'>
        <SearchBar handleChange={this.handleChange} />
        <div className='client-sitter-list'>
          <h3>Sitter List</h3>
          {this.state.sitterList && this.state.sitterList.map((sitter, index) => (
            <SitterPreview key={index} handleOptsChange={this.handleOptsChange} searchOpts={this.state.searchOpts} sitter={sitter} />
          ))}
        </div>
      </div>
    )
  }
}

export default ClientLanding
