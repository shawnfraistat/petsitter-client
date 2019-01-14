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
      service_range: 80,
      price: 80,
      animal_types: 'cats dogs rabbits reptiles birds rodents plants equines'
    }
    index(this.state)
      .then(res => res.json())
      .then(res => this.setState({ sitterList: res.sitters }))
  }

  handleOptsChange = event => {
    const opts = this.state.searchOpts
    opts[event.target.name] = event.target.value
    this.setState({
      searchOpts: opts
    })
  }

  handleOptsCheckBoxChange = event => {
    const animalArray = this.state.searchOpts.animal_types.split(' ')
    const animalName = event.target.value
    if (event.target.checked) {
      animalArray.push(animalName)
    } else {
      const index = animalArray.indexOf(animalName)
      animalArray.splice(index, 1)
    }
    const opts = this.state.searchOpts
    opts.animal_types = animalArray.join(' ').trim()
    this.setState({
      searchOpts: opts
    })
  }

  render () {
    let filteredList
    if (this.state.sitterList) {
      filteredList = this.state.sitterList.filter(sitter => (
        sitter.price <= this.state.searchOpts.price && sitter.service_range <= this.state.searchOpts.service_range
      ))
    }

    return (
      <div className='client-view-main'>
        <SearchBar handleOptsChange={this.handleOptsChange} handleOptsCheckBoxChange={this.handleOptsCheckBoxChange} searchOpts={this.state.searchOpts}/>
        <div className='client-sitter-list'>
          <h3>Sitter List</h3>
          {filteredList && filteredList.map((sitter, index) => (
            <SitterPreview key={index} sitter={sitter} />
          ))}
        </div>
      </div>
    )
  }
}

export default ClientLanding
