import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { debounce } from 'lodash'
import sortedItems from './sortItems'

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

export default function ItemList({ match, location }) {
  const itemid = match.params.itemid
  const [items, updateItems] = useState([])
  const [loading, updateLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLocation, updateSearchLocation] = useState('')
  const [query, updateQuery] = useState('')
  const [searchResults, updateSearchResults] = useState([])
  const [selectedLocation, updateselectedLocation] = useState({})

  useEffect(() => {
    if (location.state) {
      console.log(location.state)
      setSearchTerm(location.state.searchTerm)
    }
    if (location.state) {
      console.log(location.state.searchLocation)
      updateSearchLocation(location.state.searchLocation)
      updateselectedLocation(location.state.selectedLocation)
    }
  }, [])


  useEffect(() => {
    async function getList() {
      try {
        const { data } = await axios.get('/api/items')
        updateItems(data)
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    getList()
  }, [])

  useEffect(() => {
    debouncedSave(query, updateSearchResults)
  }, [query])

  async function handleChange(event) {
    event.preventDefault()
    const value = event.target.value
    setSearchTerm(value)
  }

  function filterItems() {
    return sortedItems(true, selectedLocation, items).filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  // console.log(filterItems())

  function createSearchQuery(event) {
    updateQuery(event.target.value)
    updateSearchLocation(event.target.value)
  }

  function handlePlaceSelect({ placeName, location }) {
    updateselectedLocation(location)
    updateSearchResults([])
    updateSearchLocation(placeName)
  }

  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  }

  return <section className="section">
    <div className='container searchBox'>
      <form>
        <div className="columns is-full is-centered">
          <div className="columns is-three-quarters">
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
              autoComplete="off"
            />
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
    </div>

    <div className="container">
      <div className="columns is-multiline is-mobile">
        {filterItems().map((item, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/items/${item.id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{item.name}</p>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={item.image} alt={item.name} />
                  </figure>
                </div>
              </div>
            </Link>
          </div>
        })}
        
      </div>
    </div>
  </section>
}

// return <div className="main">

//   {/*
//   // * TITLE SECTION
//   */}

//   <section className="section">
//     <div className="container">
//       <h1>Item List</h1>
//     </div>
//   </section>

//   {/*
//   // * BODY SECTION
//   */}

//   <section className="section">
//     <div className="container">
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//     </div>
//   </section>

// </div>