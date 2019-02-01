import React, { Component } from 'react'

class CreateSitterAcc extends Component {
  constructor(props) {
    super(props)
    this.handleChange = props.handleChange
    this.handleCheckBoxChange = props.handleCheckBoxChange
  }

  render () {
    return (
      <div className="auth-form sitter-form">
        <label htmlFor="about">About You as a Pet Sitter</label>
        <textarea
          required
          name="about"
          value={this.props.user && this.props.user.about}
          placeholder="Description"
          onChange={this.handleChange}
          cols="65"
          rows="3"
        />
        <label htmlFor="price">Your Typical Petsitting Price Per Day</label>
        <input
          required
          className="price"
          name="price"
          value={this.props.user && this.props.user.price}
          type="number"
          placeholder="Price"
          onChange={this.handleChange}
        />
        <label htmlFor="service_range">Maximum Distance You Will Travel (In Miles)</label>
        <input
          required
          className="distance"
          name="service_range"
          value={this.props.user && this.props.user.service_range}
          type="number"
          placeholder="Distance"
          onChange={this.handleChange}
        />
        <label htmlFor="animal_types">The Types of Pets You Will Pet Sit</label>
        <div className="animal-checkbox-div-wrapper" onChange={this.handleCheckBoxChange}>
          <div className="animal-checkbox-div">
            <input
              defaultChecked={this.props.user && this.props.user.cats}
              className="animal-checkbox"
              name="animal_types"
              value="cats"
              type="checkbox"
            />Cats
            <input
              defaultChecked={this.props.user && this.props.user.dogs}
              className="animal-checkbox"
              name="animal_types"
              value="dogs"
              type="checkbox"
            />Dogs
            <input
              defaultChecked={this.props.user && this.props.user.reptiles}
              className="animal-checkbox"
              name="animal_types"
              value="reptiles"
              type="checkbox"
            />Reptiles
            <input
              defaultChecked={this.props.user && this.props.user.birds}
              className="animal-checkbox"
              name="animal_types"
              value="birds"
              type="checkbox"
            />Birds
            <input
              defaultChecked={this.props.user && this.props.user.fish}
              className="animal-checkbox"
              name="animal_types"
              value="fish"
              type="checkbox"
            />Fish
          </div>
          <div className="animal-checkbox-div">
            <input
              defaultChecked={this.props.user && this.props.user.rabbits}
              className="animal-checkbox"
              name="animal_types"
              value="rabbits"
              type="checkbox"
            />Rabbits
            <input
              defaultChecked={this.props.user && this.props.user.rodents}
              className="animal-checkbox"
              name="animal_types"
              value="rodents"
              type="checkbox"
            />Rodents
            <input
              defaultChecked={this.props.user && this.props.user.equines}
              className="animal-checkbox"
              name="animal_types"
              value="equines"
              type="checkbox"
            />Equines
            <input
              defaultChecked={this.props.user && this.props.user.plants}
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
      </div>
    )
  }
}
export default CreateSitterAcc
