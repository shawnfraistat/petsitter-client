import React from 'react'

const SitterPreview = (props) => (
  <div>
    <p>Email: {props.sitter.user.email}</p>
    <p>Price: {props.sitter.price}</p>
    <p>Service Range: {props.sitter.service_range}</p>
    <p>Pets Sat: {props.sitter.animal_types}</p>
    <hr />
  </div>
)

export default SitterPreview
