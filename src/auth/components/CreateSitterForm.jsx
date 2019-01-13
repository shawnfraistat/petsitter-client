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
        <label htmlFor="service_range">Enter Maximum Distance You Will Travel</label>
        <br />
        <input
          required
          name="service_range"
          type="number"
          placeholder="Distance"
          onChange={this.handleChange}
        /> miles
        <br />
        <label htmlFor="animal_types">Check The Types of Animals You Will Pet Sit</label>
        <br />
        <div onChange={this.handleCheckBoxChange}>
          <input
            className="animal-checkbox"
            name="animal_types"
            value="cats"
            type="checkbox"
          />Cats
          <input
            className="animal-checkbox"
            name="animal_types"
            value="dogs"
            type="checkbox"
          />Dogs
          <input
            className="animal-checkbox"
            name="animal_types"
            value="reptiles"
            type="checkbox"
          />Reptiles
          <input
            className="animal-checkbox"
            name="animal_types"
            value="birds"
            type="checkbox"
          />Birds
          <input
            className="animal-checkbox"
            name="animal_types"
            value="fish"
            type="checkbox"
          />Fish
          <input
            className="animal-checkbox"
            name="animal_types"
            value="rabbits"
            type="checkbox"
          />Rabbits
          <input
            className="animal-checkbox"
            name="animal_types"
            value="rodents"
            type="checkbox"
          />Rodents
          <input
            className="animal-checkbox"
            name="animal_types"
            value="equines"
            type="checkbox"
          />Equines
          <input
            className="animal-checkbox"
            name="animal_types"
            value="plants"
            type="checkbox"
          />Plants
          {/* Extra options for giggles.
          <input
            className="animal-checkbox"
            name="animal_types"
            value="nakedMoleRats"
            type="checkbox"
          />Naked Mole Rats
          <input
            className="animal-checkbox"
            name="animal_types"
            value="petRocks"
            type="checkbox"
          />Pet Rocks */}
        </div>
      </div>
    )
  }
}
export default CreateSitterAcc
