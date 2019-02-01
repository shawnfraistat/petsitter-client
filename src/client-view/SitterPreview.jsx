import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './client-view.scss'
import messages from '../auth/messages.js'

import { createExchange, createFavorite, deleteFavorite }  from './api'

class SitterPreview extends Component {
  constructor (props) {
    super(props)

    this.addFavoriteToFavoriteList = props.addFavoriteToFavoriteList
    this.removeFavoriteFromFavoriteList = props.removeFavoriteFromFavoriteList
    this.flash = props.flash
  }

  onContactClick = () => {
    const { getUser, history, setUser } = this.props

    const user = getUser()

    // check to see if the client already has an exchange with sitter
    const exchange = user.client.exchanges.find(exchange => exchange.sitter_id === this.props.sitter.id)

    if (exchange === undefined) {
      // client does not have exchange with this sitter already,
      // so need to create one
      createExchange(user, this.props.sitter.id)
        .then(res => res.json())
        .then(res => user.currentExchange = res.exchange.id)
        .then(() => setUser(user))
        .then(() => history.push('/exchange'))
        .catch(() => this.flash(messages.cannotReachServer, 'flash-error'))
    } else {
      // client already has a conversation going with this sitter, so load it
      user.currentExchange = exchange.id
      setUser(user)
      history.push('/exchange')
    }
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
          <h3 className='sitter-name-h3'>{this.props.sitter.user.name}</h3>
          <p>Email: {this.props.sitter.user.email}</p>
          <p>Typical Price Per Day: ${this.props.sitter.price}</p>
          {this.props.user.canReachApi ? (<p>Distance From You: ~{this.props.sitter.distanceFromUser} miles</p>) : null}
          <p>Pets Sat: {this.props.sitter.animal_types}</p>
        </div>
        <div className='button-div'>
          {favoriteButton}
          <img className="contact-button" alt="contact" src={require('../images/contact.png')} onClick={this.onContactClick} />
        </div>
      </div>
    )
  }
}
export default withRouter(SitterPreview)
