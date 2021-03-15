import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Avatar from 'avataaars'

export default function UserList() {

  const [userData, updateUserData] = useState([])
  const [search, updateSearch] = useState('')
  const [currentUser, updateCurrentUser] = useState([])
  const [loading, updateLoading] = useState(true)
  const [follows, updateFollows] = useState('All')
  const [followed, updateFollowed] = useState('All')
  const [followers, updateFollowers] = useState([])
  const [numberOfUsers, updateNumberOfUsers] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/users')
      updateUserData(data)
      updateLoading(false)
      updateNumberOfUsers(data.length)
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchCurrentUser() {
      const token = localStorage.getItem('token')
      try {
        const { data } = await axios.get('/api/current_user', {
          headers: { Authorization: `Bearer ${token}` }
        })
        updateCurrentUser(data)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    fetchCurrentUser()
  }, [])


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

  function handleSearch() {
    const filteredData = userData.filter(user => {
      user.username.toLowerCase().includes(search.toLowerCase())
    })
    console.log(filteredData)
    updateUserData(filteredData)
    updateNumberOfUsers(filteredData.length)
  }
  

  if (loading) {
    return <div>Page is loading</div>
  }

  return <div className="main">

    {/*
    // * TITLE SECTION
    */}

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

    {/*
    // * BODY SECTION
    */}

    <button className="button" onClick={filterFollows}>Bagglers I follow</button>
    <button className="button" onClick={filterFollowers}>Bagglers who follow me</button>
    <input onChange={(event) => updateSearch(event.target.value)} placeholder="Search..." />
    <button className="button" onClick={handleSearch}>Search</button>

    <section className="section">
      <div className="container">
        <p>Your search found {numberOfUsers} Bagglers Baggling!</p>
      </div>
      <div className="container">
        <div className="columns is-multiline">
          {userData.map((user) => {
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