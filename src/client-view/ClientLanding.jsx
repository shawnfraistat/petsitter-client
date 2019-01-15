import React, { Component } from 'react'
import { index, getZipDistance } from './api'

import SitterPreview from './SitterPreview'
import SearchBar from './SearchBar'

import './client-view.scss'

class ClientLanding extends Component {
  constructor(props) {
    super(props)
    this.state = props.user
    this.state.searchOpts = {
      canReachApi: true,
      service_range: 80,
      price: 80,
      animal_types: 'cats dogs rabbits reptiles birds rodents plants equines'
    }
    index(this.state)
      .then(res => res.json())
      .then(res => this.mapSitters(res))
      .then(sitters => this.setState({ sitterList: sitters }))
      .then(() => console.log('this.state.sitterList is', this.state.sitterList))
      .catch(console.error)
  }

  mapSitters = (res) => {
    console.log('inside mapSitters, res is', res)
    res.sitters.forEach(sitter => {
      getZipDistance(this.state.zip_code, sitter.user.zip_code)
        .then(res => res.json())
        .then(res => {
          res.distance >= 0 ? sitter.distanceFromUser = Math.ceil(res.distance) : this.cannotReachApi()
        })
        .catch(console.error)
    })
    return res.sitters
  }

  cannotReachApi = () => {
    const opts = this.state.searchOpts
    opts.canReachApi = false
    this.setState({
      searchOpts: opts
    })
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

  // distanceCheck() checks to see whether the sitter is within the user's allowable distance search params
  // right now it also returns true if the sitter's distance is undefined for some reason (like the third party API isn't working, for example)
  distanceCheck = (sitter) => sitter.distanceFromUser !== undefined ? (sitter.distanceFromUser <= this.state.searchOpts.service_range && sitter.distanceFromUser <= sitter.service_range) : true

  // petsCheck() checks to see whether the sitter sits for at least one of the pet types the user has enabled
  petsCheck = (sitterPets) => {
    const searchArray = this.state.searchOpts.animal_types.split(' ')
    const sitterPetsArray = sitterPets.split(' ')
    return sitterPetsArray.some(pet => searchArray.includes(pet))
  }

  render () {
    let filteredList
    if (this.state.sitterList) {
      filteredList = this.state.sitterList.filter(sitter => (
        sitter.price <= this.state.searchOpts.price && this.distanceCheck(sitter) && this.petsCheck(sitter.animal_types)
      ))
    }

    return (
      <div className='client-view-main'>
        <SearchBar handleOptsChange={this.handleOptsChange} handleOptsCheckBoxChange={this.handleOptsCheckBoxChange} searchOpts={this.state.searchOpts}/>
        <div className='client-sitter-list'>
          <h3>Sitter List</h3>
          {filteredList && filteredList.map((sitter, index) => (
            <SitterPreview key={index} sitter={sitter} canReachApi={this.state.searchOpts.canReachApi}/>
          ))}
        </div>
      </div>
    )
  }
}

export default ClientLanding
