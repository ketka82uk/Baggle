import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { debounce } from 'lodash'
import sortedItems from './sortItems'
import Moment from 'react-moment'
import { getLoggedInUserId } from '../lib/auth'


const debouncedSave = debounce((query, updateSearchResults) => {
  axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=gb&access_token=${process.env.MAPBOX_TOKEN}`)
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
  const [userId, setUserId] = useState(0)
  const [logIn, updateLogin] = useState(false)
  const [userLocation, setUserLocation] = useState({})
  const [searchLat, setSearchLat] = useState(0)
  const [searchLong, setSearchLong] = useState(0)

  

  useEffect(() => {
    if (location.state) {
      setSearchTerm(location.state.searchTerm)
    }
    if (location.state) {
      updateSearchLocation(location.state.searchLocation)
      updateselectedLocation(location.state.selectedLocation)
      setSearchLat(location.state.searchLat)
      setSearchLong(location.state.searchLong)
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
    const handleLogin = () => {
      const token = localStorage.getItem('token')
      if (token) {
        updateLogin(true)
        setUserId(getLoggedInUserId())
      } else {
        updateLogin(false)
      }
    }
    handleLogin()
  }, [])


  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`/api/users/${userId}`)
        setUserLocation({ lat: data.lat, long: data.lng })
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [userId])


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

  function createSearchQuery(event) {
    updateQuery(event.target.value)
    updateSearchLocation(event.target.value)
  }

  function handlePlaceSelect({ placeName, location }) {
    updateselectedLocation(location)
    updateSearchResults([])
    updateSearchLocation(placeName)
    setSearchLat(searchResults[0].location.lat)
    setSearchLong(searchResults[0].location.long)
  }


  function distance(lat1, long1, lat2, long2) {
    if ((lat1 === lat2) && (long1 === long2)) {
      return 0
    } else {
      const radlat1 = Math.PI * lat1 / 180
      const radlat2 = Math.PI * lat2 / 180
      const theta = long1-long2
      const radtheta = Math.PI * theta / 180
      let distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      if (distance > 1) {
        distance = 1
      }
      distance = Math.acos(distance)
      distance = distance * 180 / Math.PI
      distance = distance * 60 * 1.1515
      distance = distance * 1.609344
      return Math.floor(distance)
    }
  }


  if (loading) {
    return <div className='searchBox'><ClipLoader loading={loading} size={100} /></div>
  }


  return <section className="section">
    <div className='container searchBox'>
      <form>
        <div className="tile is-8 search-container is-centered">
          <div className="tile box center-row">
            <div className="left-search">
              <input
                type="text"
                placeholder="What?"
                className="input is-info"
                onChange={(event) => handleChange(event)}
                value={searchTerm}
                className="input-large"
              />
            </div>
            <div className="right-search">
              <input
                className="input-large pl-4"
                id="input-width"
                type="text"
                placeholder="Where?"
                onChange={createSearchQuery}
                value={searchLocation}
                autoComplete="off"
              />
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
    </div>

    <div className="container">
      <div className="columns is-multiline is-mobile">
        {filterItems().map((item, index) => {
          return <div key={index} className="column is-one-quarter-desktop is-half-tablet is-half-mobile">
            <Link to={`/items/${item.id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="subtitle is-6">{item.owner.username}'s</p>
                      <p className="title is-4">{item.name}</p>
                      {searchLat !== 0 && <p className="subtitle is-6">{item.owner.town} || {distance(item.owner.lat, item.owner.lng, searchLat, searchLong)}km away</p>}
                      <p className="small-text">Created <Moment fromNow ago>{item.created_at}</Moment> ago.</p>
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


