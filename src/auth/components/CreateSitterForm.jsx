import React, { Component } from 'react'

class CreateSitterAcc extends Component {
  constructor(props) {
    super()
    this.handleChange = props.handleChange
    this.handleCheckBoxChange = props.handleCheckBoxChange
  }

  render () {
    return (
      <div>
        <label htmlFor="about">About You</label>
        <br />
        <textarea
          required
          name="about"
          placeholder="Description"
          onChange={this.handleChange}
          cols="65"
          rows="3"
        />
        <label htmlFor="price">Enter Your Typical Petsitting Price Per Day</label>
        <br />
        <input
          required
          name="price"
          type="number"
          placeholder="Price"
          onChange={this.handleChange}
        /> dollars per day
        <label htmlFor="distance">Enter Maximum Distance You Will Travel</label>
        <br />
        <input
          required
          name="distance"
          type="number"
          placeholder="Distance"
          onChange={this.handleChange}
        /> miles
        <br />
        <label htmlFor="animalTypes">Check The Types of Animals You Will Pet Sit</label>
        <br />
        <div onChange={this.handleCheckBoxChange}>
          <input
            className="animal-checkbox"
            name="animalTypes"
            value="cats"
            type="checkbox"
          />Cats
          <input
            className="animal-checkbox"
            name="animalTypes"
            value="dogs"
            type="checkbox"
          />Dogs
          <input
            className="animal-checkbox"
            name="animalTypes"
            value="reptiles"
            type="checkbox"
          />Reptiles
          <input
            className="animal-checkbox"
            name="animalTypes"
            value="birds"
            type="checkbox"
          />Birds
        </div>
      </div>
    )
  }
}
export default CreateSitterAcc
