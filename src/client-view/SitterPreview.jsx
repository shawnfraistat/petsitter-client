import React from 'react'

import './client-view.scss'

const SitterPreview = (props) => (
  <div className='sitter-preview-div'>
    <p>Email: {props.sitter.user.email}</p>
    <p>Price: {props.sitter.price}</p>
    <p>Service Range: {props.sitter.service_range}</p>
    <p>Pets Sat: {props.sitter.animal_types}</p>
  </div>
)

export default SitterPreview
