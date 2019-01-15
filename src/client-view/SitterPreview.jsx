import React from 'react'

import './client-view.scss'

const SitterPreview = (props) => (
  <div className='sitter-preview-div'>
    <p>Email: {props.sitter.user.email}</p>
    <p>Price: {props.sitter.price}</p>
    <p>Distance From You: ~{props.sitter.distanceFromUser} miles</p>
    <p>Pets Sat: {props.sitter.animal_types}</p>
  </div>
)

export default SitterPreview
