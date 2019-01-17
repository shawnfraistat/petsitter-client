import React, { Component } from 'react'
import { index, getZipDistance, getFavorites } from './api'

import SitterPreview from './SitterPreview'
import SearchBar from './SearchBar'

import './client-view.scss'

class ClientLanding extends Component {
  constructor(props) {
    super(props)
    this.state = props.user
    this.state.searchOpts = {
      canReachApi: true,
      service_range: 40,
      price: 40,
      animal_types: 'cats dogs rabbits reptiles birds rodents plants equines',
      favorites_only: false
    }
    index(this.state)
      .then(res => res.json())
      .then(res => this.mapSitters(res))
      .then(sitters => this.setState({ sitterList: sitters }))
      .then(() => console.log('this.state.sitterList is', this.state.sitterList))
      .catch(console.error)
    getFavorites(this.state)
      .then(res => res.json())
      .then(res => this.setState({ favoritesList: res.favorites }))
      .then(() => console.log('after getting favorites, this.state is', this.state))
      .then(() => console.log('this.state.favoritesList is', this.state.favoritesList))
      .catch(console.error)
  }

  // cannotReachApi() is triggered if the app can't reach the third party zip code API
  // it hides the ability for clients to search by distance
  cannotReachApi = () => {
    console.log('cannotReachApi!')
    const opts = this.state.searchOpts
    opts.canReachApi = false
    this.setState({
      searchOpts: opts
    })
  }

  // distanceCheck() checks to see whether the sitter is within the user's allowable distance search params
  // right now it also returns true if the sitter's distance is undefined for some reason (like the third party API isn't working, for example)
  distanceCheck = (sitter) => (sitter.distanceFromUser !== undefined
    ? (sitter.distanceFromUser <= this.state.searchOpts.service_range && sitter.distanceFromUser <= sitter.service_range)
    : true)

  favoriteCheck = (sitter) => {
    if (this.state.searchOpts.favorites_only) {
      if (this.state.favoritesList.some(favorite => favorite.client.id === this.state.client.id && favorite.sitter.id === sitter.id)) {
        return true
      } else {
        return false
      }
    }
    return true
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

  handleOptsFavoritesChange = event => {
    const opts = this.state.searchOpts
    event.target.checked ? opts.favorites_only = true : opts.favorites_only = false
    this.setState({
      searchOpts: opts
    })
  }

  // mapSitters() attempts to add distanceFromUser to each sitter by comparing
  // their zip code to the client's via a third party API
  // if it can't reach the third party API, it triggers this.cannotReachApi()
  mapSitters = (res) => {
    console.log('inside mapSitters, res is', res)
    res.sitters.forEach(sitter => {
      getZipDistance(this.state.zip_code, sitter.user.zip_code)
        .then(res => res.json())
        .then(res => sitter.distanceFromUser = Math.ceil(res.distance))
        .catch(this.cannotReachApi)
    })
    return res.sitters
  }

  // petsCheck() checks to see whether the sitter sits for at least one of the pet types the user has enabled
  petsCheck = (sitterPets) => {
    const searchArray = this.state.searchOpts.animal_types.split(' ')
    const sitterPetsArray = sitterPets.split(' ')
    return sitterPetsArray.some(pet => searchArray.includes(pet))
  }

  addFavoriteToFavoriteList = (newFavorite) => {
    const newFavoritesList =  this.state.favoritesList
    newFavoritesList.push(newFavorite)
    this.setState({ favoritesList: newFavoritesList })
  }

  removeFavoriteFromFavoriteList = (favoriteID) => {
    const newFavoritesList = this.state.favoritesList
    const index = newFavoritesList.findIndex(favorite => favorite.id === favoriteID)
    newFavoritesList.splice(index, 1)
    this.setState({ favoritesList: newFavoritesList })
  }

  render () {
    let filteredList
    if (this.state.sitterList) {
      filteredList = this.state.sitterList.filter(sitter => (
        sitter.price <= this.state.searchOpts.price && this.distanceCheck(sitter) && this.petsCheck(sitter.animal_types) && this.favoriteCheck(sitter)
      ))
    }

    return (
      <div className='row client-view-main'>
        <SearchBar handleOptsChange={this.handleOptsChange} handleOptsCheckBoxChange={this.handleOptsCheckBoxChange} handleOptsFavoritesChange={this.handleOptsFavoritesChange} searchOpts={this.state.searchOpts}/>
        <div className='col-9 client-sitter-list'>
          {filteredList && filteredList.map((sitter, index) => (
            <SitterPreview key={index} sitter={sitter} user={this.state} addFavoriteToFavoriteList={this.addFavoriteToFavoriteList} removeFavoriteFromFavoriteList={this.removeFavoriteFromFavoriteList} canReachApi={this.state.searchOpts.canReachApi}/>
          ))}
        </div>
      </div>
    )
  }
}

export default ClientLanding
