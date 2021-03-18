import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Avatar from 'avataaars'
import { getLoggedInUserId } from '../lib/auth'
import Moment from 'react-moment'
import Icon from '@material-ui/core/Icon'
import ClipLoader from 'react-spinners/ClipLoader'

export default function UserList() {

  const [userData, updateUserData] = useState([])
  const [userMemoryData, updateMemoryData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentUser, updateCurrentUser] = useState({})
  const [loading, updateLoading] = useState(true)
  const [follows, updateFollows] = useState('All')
  const [followed, updateFollowed] = useState('All')
  const [followers, updateFollowers] = useState([])
  const [numberOfUsers, updateNumberOfUsers] = useState(0)
  const [logIn, updateLogin] = useState(false)


  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/users')
      updateUserData(data)
      updateMemoryData(data)
      updateLoading(false)
      updateNumberOfUsers(data.length)
    }
    fetchData()
  }, [])


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    updateLogin(true)
    async function fetchUser() {
      try {
        const { data } = await axios.get(`/api/users/${getLoggedInUserId()}`)
        updateCurrentUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  },[])

  function getRating(user) {
    const totalRatings = user.positive_rating + user.negative_rating
    const positivePercentage = Math.floor(user.positive_rating / totalRatings * 100)
    if(positivePercentage > 0) {
      return positivePercentage
    } else return 0
  }

  // function getBaggles(user) {
  //   const availableBaggles = user.inventory.filter((item) => {
  //   return item.listed
  //   })
  //   return availableBaggles
  // }

  function filterFollows() {
    const filteredData = currentUser.follows
    updateUserData(filteredData)
    updateNumberOfUsers(filteredData.length)
  }

  function filterFollowers() {
    const filteredData = currentUser.followers
    updateUserData(filteredData)
    updateNumberOfUsers(filteredData.length)
  }

  async function handleChange(event) {
    event.preventDefault()
    const value = event.target.value
    setSearchTerm(value)
  }

  function filterUsers() {
    return userData.filter((user) => {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }

  function clearSearch() {
    updateUserData(userMemoryData)
  }
  

  if (loading) {
    return <div className='searchBox'><ClipLoader loading={loading} size={100} /></div>
  }

  return <div className="main">

    <div className="columns is-full is-centered">
      <div className="column is-one-third">

        <div className="tile box">
          <div className="icon-holder">
            <Icon>search</Icon>
          </div>
          <input
            type="text"
            placeholder="Search for fellow bagglers..."
            className="input is-info is-half"
            onChange={(event) => handleChange(event)}
            value={searchTerm}
          />
        </div>
        {/* <button className="button" onClick={handleSearch}>Search</button> */}
        <div className="columns">
          {logIn ? <button className="button" onClick={filterFollows}>Bagglers I follow</button> : <div></div>}
          {logIn ? <button className="button" onClick={filterFollowers}>Bagglers who follow me</button> : <div></div>}
          {logIn ? <button className="button" onClick={clearSearch}>Everyone</button> : <div></div>}
        </div>+
      </div>
    </div>

    <section className="section">
      <div className="container">
        <div className="main-title-text">
          <p>Your search found <span style={{ color: '#B24231', fontFamily: 'Mouse Memoirs', fontSize: '50px' }}>{numberOfUsers} Bagglers</span></p>
        </div>
      </div>
      <div className="container">
        <div className="columns is-multiline">
          {filterUsers().map((user) => {
            return <div className="column is-one-fifth" key={user.id}>
              <Link to={`/users/${user.id}`}>
                <div className="card">
                  <div 
                    className="card-image" 
                    style={{ 
                      backgroundImage: `url(${user.image})`,
                      backgroundSize: 'cover'
                    }}>
                    <figure className="image is-4by3">
                      <img src={user.profile_image} />
                    </figure>
                  </div>
                  <div className="card-content">
                  
                    <p className="title mb-0">{user.username}</p>
                    {getRating(user) === 0 && <div className="content"><p className="emoji mt-0 mb-0">😶</p><p className="subtitle is-5">Unrated Baggler from {user.town}</p></div>}
                    {getRating(user) > 90 && <div className="content"><p className="emoji mt-0 mb-0">🤩 </p><p className="subtitle is-5">Top Baggler from {user.town}</p></div>}
                    {getRating(user) < 60 && getRating(user) >= 50 && <div className="content"><p className="emoji mt-0 mb-0">😐</p><p className="subtitle is-5">Neutral Baggler from {user.town}</p></div>}
                    {getRating(user) < 90 && getRating(user) >= 60 && <div className="content"><p className="emoji mt-0 mb-0">😁 </p><p className="subtitle is-5">Good Baggler from {user.town}</p></div>}
                    {getRating(user) < 50 && getRating(user) >= 1 && <div className="content"><p className="emoji mt-0 mb-0">💩 </p><p className="subtitle is-5">Bad Baggler from {user.town}</p></div>}
                    <p className="subtitle is-6">Baggling since <span className="red-text"><Moment format ="Do MMM YYYY">{user.created_at}</Moment></span></p>
                  
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>

  </div>

}