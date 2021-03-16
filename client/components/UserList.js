import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Avatar from 'avataaars'
import { getLoggedInUserId } from '../lib/auth'

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
  })

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
    return <div>Page is loading</div>
  }

  return <div className="main">

    <section className="section">
      <div className="container">
        <h1>Bagglers</h1>
      </div>
      <div className="todo">
        <ul>
          <li>Filter by followed users and users who follow you</li>
          <li>Sort by users according to distance and rating</li>
          <li>To find users you follow - map through users and see if they appear in your follow list</li>
          <li>To find users who follow you - map through users and see if they appear in your follower list</li>
        </ul>
      </div>
    </section>

    <div className="columns is-full is-centered">
      <div className="column is-one-third">
        {logIn ? <button className="button" onClick={filterFollows}>Bagglers I follow</button> : <div></div>}
        {logIn ? <button className="button" onClick={filterFollowers}>Bagglers who follow me</button> : <div></div>}
        {logIn ? <button className="button" onClick={clearSearch}>Everyone</button> : <div></div>}
        <input
          type="text"
          placeholder="Search for fellow bagglers..."
          className="input is-info is-half"
          onChange={(event) => handleChange(event)}
          value={searchTerm}
        />
        {/* <button className="button" onClick={handleSearch}>Search</button> */}
      </div>
    </div>

    <section className="section">
      <div className="container">
        <p>Your search found {numberOfUsers} Bagglers Baggling!</p>
      </div>
      <div className="container">
        <div className="columns is-multiline">
          {filterUsers().map((user) => {
            return <div className="column is-one-fifth" key={user.id}>
              <Link to={`/users/${user.id}`}>
                <div className="card">
                  <div className="card-image">
                    <img src={user.image} />
                  </div>
                  <div className="card-content">
                    <div className="content"></div>
                    <p>{user.username}</p>
                    <p>{user.rating}</p>
                    <p>{user.location}</p>
                    <p>{user.created_at}</p>
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