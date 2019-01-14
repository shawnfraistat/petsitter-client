import React, { Component } from 'react'

class CreateSitterAcc extends Component {
  constructor(props) {
    super()
    this.handleChange = props.handleChange
    this.handleCheckBoxChange = props.handleCheckBoxChange
    if (props.user) {
      this.state = props.user
    }
  }

  render () {
    let about
    let price
    let service_range
    let cats, dogs, reptiles, birds, fish, rabbits, rodents, equines, plants
    if (this.state) {
      const { sitter } = this.state
      about = sitter.about
      price = sitter.price
      service_range = sitter.service_range
      cats = sitter.animal_types.search('cats') !== -1
      dogs = sitter.animal_types.search('dogs') !== -1
      reptiles = sitter.animal_types.search('reptiles') !== -1
      birds = sitter.animal_types.search('birds') !== -1
      fish = sitter.animal_types.search('fish') !== -1
      rabbits = sitter.animal_types.search('rabbits') !== -1
      rodents = sitter.animal_types.search('rodents') !== -1
      equines = sitter.animal_types.search('equines') !== -1
      plants = sitter.animal_types.search('plants') !== -1
    }

    return (
      <div>
        <label htmlFor="about">About You</label>
        <br />
        <textarea
          required
          name="about"
          value={about}
          placeholder="Description"
          onChange={this.handleChange}
          cols="65"
          rows="3"
        />
        <label htmlFor="price">Your Typical Petsitting Price Per Day</label>
        <br />
        <input
          required
          name="price"
          value={price}
          type="number"
          placeholder="Price"
          onChange={this.handleChange}
        /> dollars per day
        <label htmlFor="service_range">Maximum Distance You Will Travel</label>
        <br />
        <input
          required
          name="service_range"
          value={service_range}
          type="number"
          placeholder="Distance"
          onChange={this.handleChange}
        /> miles
        <br />
        <label htmlFor="animal_types">The Types of Pets You Will Pet Sit</label>
        <br />
        <div onChange={this.handleCheckBoxChange}>
          <input
            defaultChecked={cats}
            className="animal-checkbox"
            name="animal_types"
            value="cats"
            type="checkbox"
          />Cats
          <input
            defaultChecked={dogs}
            className="animal-checkbox"
            name="animal_types"
            value="dogs"
            type="checkbox"
          />Dogs
          <input
            defaultChecked={reptiles}
            className="animal-checkbox"
            name="animal_types"
            value="reptiles"
            type="checkbox"
          />Reptiles
          <input
            defaultChecked={birds}
            className="animal-checkbox"
            name="animal_types"
            value="birds"
            type="checkbox"
          />Birds
          <input
            defaultChecked={fish}
            className="animal-checkbox"
            name="animal_types"
            value="fish"
            type="checkbox"
          />Fish
          <input
            defaultChecked={rabbits}
            className="animal-checkbox"
            name="animal_types"
            value="rabbits"
            type="checkbox"
          />Rabbits
          <input
            defaultChecked={rodents}
            className="animal-checkbox"
            name="animal_types"
            value="rodents"
            type="checkbox"
          />Rodents
          <input
            defaultChecked={equines}
            className="animal-checkbox"
            name="animal_types"
            value="equines"
            type="checkbox"
          />Equines
          <input
            defaultChecked={plants}
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
