import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchOpts: props.searchOpts
    }
    console.log('inside searchbar, this.state is', this.state)
    console.log('props are', props)
  }

  render () {
    return (
      <div>
        <h3>Search Bar</h3>
        <form>
          <label htmlFor="price">Max Price</label>
          <br />
          <input
            required
            name="price"
            value={this.state.searchOpts.price}
            type="number"
            placeholder="Price"
            onChange={this.props.handleOptsChange}
          /> dollars per day
          {this.state.searchOpts.canReachApi && (
            <div>
              <label htmlFor="service_range">Max Distance</label>
              <br />
              <input
                required
                name="service_range"
                value={this.state.searchOpts.service_range}
                type="number"
                placeholder="Distance"
                onChange={this.props.handleOptsChange}
              /> miles
              <br />
            </div>
          )}
          <label htmlFor="animal_types">Search By Pet Types</label>
          <br />
          <div onChange={this.props.handleOptsCheckBoxChange}>
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="cats"
              type="checkbox"
            />Cats
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="dogs"
              type="checkbox"
            />Dogs
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="reptiles"
              type="checkbox"
            />Reptiles
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="birds"
              type="checkbox"
            />Birds
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="fish"
              type="checkbox"
            />Fish
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="rabbits"
              type="checkbox"
            />Rabbits
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="rodents"
              type="checkbox"
            />Rodents
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="equines"
              type="checkbox"
            />Equines
            <input
              defaultChecked
              className="animal-checkbox"
              name="animal_types"
              value="plants"
              type="checkbox"
            />Plants
          </div>
        </form>
      </div>
    )
  }
}

export default SearchBar
