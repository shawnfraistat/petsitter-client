import React, { Component } from 'react'

import SitterPreview from './SitterPreview'
import SearchBar from './SearchBar'

// import messages from '../auth/messages.js'
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
  }

  // addFavoriteToFavoriteList() updates ClientLanding's state by adding a new
  // favorite to the favorites list--that way if the user favorites a sitter, it
  // will display immediately
  addFavoriteToFavoriteList = (newFavorite) => {
    const newFavoritesList =  this.state.favoritesList
    newFavoritesList.push(newFavorite)
    this.setState({ favoritesList: newFavoritesList })
  }

  // distanceCheck() checks to see whether the sitter is within the user's
  // allowable distance search params;
  // right now it also returns true if the sitter's distance is undefined for
  // some reason (like the third party API isn't working, for example)
  distanceCheck = (sitter) => (sitter.distanceFromUser !== undefined
    ? (sitter.distanceFromUser <= this.state.searchOpts.service_range && sitter.distanceFromUser <= sitter.service_range)
    : true)

  // favoriteCheck() checks to see whether a sitter has been favorited by the
  // current user
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

  // handleOptsChange() updates ClientLanding's state with new search options if
  // the user changes their search options
  handleOptsChange = event => {
    const opts = this.state.searchOpts
    opts[event.target.name] = event.target.value
    this.setState({
      searchOpts: opts
    })
  }

  // handleOptsChange() updates ClientLanding's state with new search options if
  // the user changes their search options via pet name checkboxes
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

  // handleOptsFavoritesChange() updates ClientLanding's state with new search
  // options if the user checks or unchecks the "favorites_only" checkbox
  handleOptsFavoritesChange = event => {
    const opts = this.state.searchOpts
    event.target.checked ? opts.favorites_only = true : opts.favorites_only = false
    this.setState({
      searchOpts: opts
    })
  }

  // petsCheck() checks to see whether the sitter sits for at least one of the
  // pet types the user has enabled
  petsCheck = (sitterPets) => {
    const searchArray = this.state.searchOpts.animal_types.split(' ')
    const sitterPetsArray = sitterPets.split(' ')
    return sitterPetsArray.some(pet => searchArray.includes(pet))
  }

  // removeFavoriteFromFavoriteList() updates ClientLanding's state by removing
  // a favorite from the favorites list--that way if the user unfavorites a
  // sitter, it will display immediately
  removeFavoriteFromFavoriteList = (favoriteID) => {
    const newFavoritesList = this.state.favoritesList
    const index = newFavoritesList.findIndex(favorite => favorite.id === favoriteID)
    newFavoritesList.splice(index, 1)
    this.setState({ favoritesList: newFavoritesList })
  }

  render () {
    // when the component renders, first filters all of the sitters based on search options
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
