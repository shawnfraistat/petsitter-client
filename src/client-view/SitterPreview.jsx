import React, { Component } from 'react'

import './client-view.scss'

import { createFavorite, deleteFavorite }  from './api'

class SitterPreview extends Component {
  constructor (props) {
    super(props)

    this.addFavoriteToFavoriteList = props.addFavoriteToFavoriteList
    this.removeFavoriteFromFavoriteList = props.removeFavoriteFromFavoriteList
  }

  onFavoriteClick = () => {
    console.log('inside onFavoriteClick, props is', this.props)
    createFavorite(this.props.user, this.props.sitter.id)
      .then(res => res.json())
      .then(res => this.addFavoriteToFavoriteList(res.favorite))
      .catch(console.error)
  }

  onUnFavoriteClick = () => {
    console.log('inside onUnFavoriteClick, props is', this.props)
    const id = this.props.user.favoritesList.find(favorite => favorite.client.id === this.props.user.client.id && favorite.sitter.id === this.props.sitter.id).id
    console.log('inside onUnFavoriteClick, id is', id)
    deleteFavorite(this.props, id)
      .then(() => {
        console.log('after deleting favorite, id is', id)
        this.removeFavoriteFromFavoriteList(id)
      })
      .catch(console.error)
  }

  render() {
    console.log('inside render function of SitterPreview, this.props is', this.props)
    let favoriteButton
    if (this.props.user.favoritesList) {
      if (this.props.user.favoritesList.some(favorite => favorite.client.id === this.props.user.client.id && favorite.sitter.id === this.props.sitter.id)) {
        console.log('found a favorite!')
        favoriteButton = (<img className="favorite-button" src={require('../images/favorited.png')} onClick={this.onUnFavoriteClick} />)
      } else {
        favoriteButton = (<img className="favorite-button" src={require('../images/favorite.png')} onClick={this.onFavoriteClick} />)
      }
    }
    return (
      <div className='sitter-preview-div'>
        <p>Email: {this.props.sitter.user.email}</p>
        <p>Typical Price Per Day: ${this.props.sitter.price}</p>
        {this.props.canReachApi ? (<p>Distance From You: ~{this.props.sitter.distanceFromUser} miles</p>) : null}
        <p>Pets Sat: {this.props.sitter.animal_types}</p>
        {favoriteButton}
      </div>
    )
  }
}
export default SitterPreview
