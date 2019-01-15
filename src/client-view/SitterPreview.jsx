import React, { Component } from 'react'

import './client-view.scss'

import { createFavorite }  from './api'

class SitterPreview extends Component {
  constructor (props) {
    super(props)
  }

  onFavoriteClick = () => {
    console.log('inside onFavoriteClick, props is', this.props)
    createFavorite(this.props.user, this.props.sitter.id)
      .then(console.log)
  }

  render() {
    const favoriteButton = (<img className="favorite-button" src={require('../images/favorite.png')} onClick={this.onFavoriteClick} />)
    const favoritedButton = (<img className="favorite-button" src={require('../images/favorited.png')} onClick={this.onFavoriteClick} />)
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
