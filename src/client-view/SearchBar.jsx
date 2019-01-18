import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchOpts: props.searchOpts
    }
  }

  render () {
    return (
      <div className='col-3 search-bar'>
        <h3>Search Bar</h3>
        <form>
          <label htmlFor="price">Max Price:</label>
          <br />
          <input
            required
            className="search-text-field"
            name="price"
            value={this.state.searchOpts.price}
            type="number"
            placeholder="Price"
            onChange={this.props.handleOptsChange}
          /> dollars per day
          {this.state.searchOpts.canReachApi && (
            <div>
              <label htmlFor="service_range">Max Distance:</label>
              <br />
              <input
                required
                className="search-text-field"
                name="service_range"
                value={this.state.searchOpts.service_range}
                type="number"
                placeholder="Distance"
                onChange={this.props.handleOptsChange}
              /> miles
              <br />
            </div>
          )}
          <label htmlFor="favorites_only">Show Favorited Sitters Only:</label>
          <input
            name="favorites_only"
            type="checkbox"
            onChange={this.props.handleOptsFavoritesChange}
          />
          <br />
          <label htmlFor="animal_types">Search By Pet Types:</label>
          <div onChange={this.props.handleOptsCheckBoxChange}>
            <div className="animal-checkbox-column">
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="cats"
                  type="checkbox"
                />Cats
              </div>
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="dogs"
                  type="checkbox"
                />Dogs
              </div>
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="reptiles"
                  type="checkbox"
                />Reptiles
              </div>
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="birds"
                  type="checkbox"
                />Birds
              </div>
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="fish"
                  type="checkbox"
                />Fish
              </div>
            </div>
            <div className="animal-checkbox-column">
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="rabbits"
                  type="checkbox"
                />Rabbits
              </div>
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="rodents"
                  type="checkbox"
                />Rodents
              </div>
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="equines"
                  type="checkbox"
                />Equines
              </div>
              <div>
                <input
                  defaultChecked
                  className="animal-checkbox"
                  name="animal_types"
                  value="plants"
                  type="checkbox"
                />Plants
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SearchBar
