import React, { Component } from 'react'

import './client-view.scss'
import messages from '../auth/messages.js'

import { createFavorite, deleteFavorite }  from './api'

class SitterPreview extends Component {
  constructor (props) {
    super(props)

    this.addFavoriteToFavoriteList = props.addFavoriteToFavoriteList
    this.removeFavoriteFromFavoriteList = props.removeFavoriteFromFavoriteList
    this.flash = props.flash
  }

  onFavoriteClick = () => {
    createFavorite(this.props.user, this.props.sitter.id)
      .then(res => res.json())
      .then(res => this.addFavoriteToFavoriteList(res.favorite))
      .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
  }

  onUnFavoriteClick = () => {
    const id = this.props.user.client.favorites.find(favorite => favorite.client_id === this.props.user.client.id && favorite.sitter_id === this.props.sitter.id).id
    deleteFavorite(this.props, id)
      .then(() => {
        this.removeFavoriteFromFavoriteList(id)
      })
      .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
  }

  render() {
    let favoriteButton
    console.log(this.props.user)
    if (this.props.user.client.favorites) {
      if (this.props.user.client.favorites.some(favorite => favorite.client_id === this.props.user.client.id && favorite.sitter_id === this.props.sitter.id)) {
        favoriteButton = (<img className="favorite-button" alt="favorite" src={require('../images/favorited.png')} onClick={this.onUnFavoriteClick} />)
      } else {
        favoriteButton = (<img className="favorite-button" alt="favorite" src={require('../images/favorite.png')} onClick={this.onFavoriteClick} />)
      }
    }
    const imageSrc = this.props.sitter.user.image.url ? this.props.sitter.user.image.url : require('../images/profile-icon.png')
    return (
      <div className='sitter-preview-div'>
        <img className='sitter-preview-image' alt="sitter pic" src={imageSrc} />
        <div className='sitter-preview-info'>
          <h3 className='sitter-name-h3'>{this.props.sitter.name}</h3>
          <p>Email: {this.props.sitter.user.email}</p>
          <p>Typical Price Per Day: ${this.props.sitter.price}</p>
          {this.props.canReachApi ? (<p>Distance From You: ~{this.props.sitter.distanceFromUser} miles</p>) : null}
          <p>Pets Sat: {this.props.sitter.animal_types}</p>
        </div>
        <div className='favorite-button-div'>
          {favoriteButton}
        </div>
      </div>
    )
  }
}
export default SitterPreview
