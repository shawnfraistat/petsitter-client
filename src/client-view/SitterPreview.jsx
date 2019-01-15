import React from 'react'

import './client-view.scss'

const SitterPreview = (props) => {
  console.log('inside sitterPreview, props is', props)
  return (
    <div className='sitter-preview-div'>
      <p>Email: {props.sitter.user.email}</p>
      <p>Price: {props.sitter.price}</p>
      {props.canReachApi ? (<p>Distance From You: ~{props.sitter.distanceFromUser} miles</p>) : null}
      <p>Pets Sat: {props.sitter.animal_types}</p>
    </div>
  )
}
export default SitterPreview
