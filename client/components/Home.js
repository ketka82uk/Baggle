import axios from 'axios'
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import { getLoggedInUserId } from '../lib/auth'

import Carousel from './Carousel'

const debouncedSave = debounce((query, updateSearchResults) => {
  axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=gb&access_token=pk.eyJ1IjoidXJ1MzgiLCJhIjoiY2ttNnBveXQ2MHFnaDJ4anhtdmhnbHBmeSJ9.OWgGgvZU2cJlbxp-jAJh_g`)
    .then(({ data }) => {
      const search = data.features.map(location => {
        return {
          id: location.id,
          placeName: location.place_name,
          location: {
            lat: location.center[1],
            long: location.center[0]
          }
        }
      })
      updateSearchResults(search)
    })
}, 500)

export default function Home( { history } ) {
  const [items, updateItems] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLocation, updateSearchLocation] = useState('')
  const [query, updateQuery] = useState('')
  const [searchResults, updateSearchResults] = useState([])
  const [selectedLocation, updateselectedLocation] = useState({})

  // const [categories, updateCategories] = useState([])

  const categories = ['entertainment', 'clothing', 'home_and_garden', 'food_and_drink', 'motor', 'children']
  // const type = ['services', 'goods']

  useEffect(() => {
    axios.get('/api/items')
      .then(resp => {
        updateItems(resp.data)
      })
  }, [])

  useEffect(() => {
    debouncedSave(query, updateSearchResults)
  }, [query])

  async function handleChange(event) {
    event.preventDefault()
    const value = event.target.value
    setSearchTerm(value)
  }

  function createSearchQuery(event) {
    updateQuery(event.target.value)
    updateSearchLocation(event.target.value)
  }

  function handlePlaceSelect({ placeName, location }) {
    updateselectedLocation(location)
    updateSearchResults([])
    updateSearchLocation(placeName)
  }

  function handleSubmit(event) {
    event.preventDefault()
    history.push({
      pathname: '/items',
      state: {
        searchTerm: searchTerm,
        searchLocation: selectedLocation
        // get this out on the other side by: props.location.state.searchFilter
      }
    })
  }

  return <div className="main">

    <section className="hero is-primary is-medium">
      <div className="hero-body has-text-centered">
        <p className="title">
          Not for sale
        </p>
        <p className="subtitle">
          Start bartering...
        </p>
      </div>
    </section>

    <form onSubmit={handleSubmit}>
      <div className="columns is-half is-centered">
        <div className="columns is-half">
          <input
            type="text"
            placeholder="Start baggling!"
            className="input is-info is-9"
            onChange={(event) => handleChange(event)}
            value={searchTerm}
          />
          <input
            className="input is-info"
            id="input-width"
            type="text"
            placeholder="Search for an item near you!"
            onChange={createSearchQuery}
            value={searchLocation}
          />
          <div className="control">
            <button className="button is-primary">Submit</button>
          </div>
        </div>
        {searchResults.length > 0 &&
            <div className='dropdown is-active is-fullwidth'>
              <div className='dropdown-menu'>
                <div className='dropdown-content'>
                  {searchResults.map((place) => {
                    return <div key={place.id}>
                      <div className='dropdown-item' id='cardHover' onClick={() => handlePlaceSelect(place)}>{place.placeName}</div>
                      <hr className="dropdown-divider"></hr></div>
                  })}
                </div>
              </div>
            </div>}
      </div>
    </form>
              

    <section>
      <div className='has-text-is-centered'>
        <div className='is-size-3'>Latest postings</div>
      </div>
      <div className="container is-max-widescreen">
        {categories.map((category, i) => {
          return <div className='section' key={i}>
            <Carousel items={items} category={category}/>
          </div>
        })}
      </div>
    </section>
  </div>
}

