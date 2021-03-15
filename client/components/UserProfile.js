import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator, getLoggedInUserId } from '../lib/auth.js'
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function UserProfile({ match, history }) {

  const [profile, updateProfile] = useState([])
  const [loading, updateLoading] = useState(true)
  const [rating, updateRating] = useState(0)
  const [rated, updateRated] = useState(false)
  const [currentUser, updateCurrentUser] = useState([])
  const [commentData, updateCommentData] = useState({
    content: '',
    positive_rating: false,
    negative_rating: false
  })
  const token = localStorage.getItem('token')

  const userId = match.params.userId

  async function fetchData() {
    const { data } = await axios.get(`/api/users/${userId}`)
    updateProfile(data)
    updateLoading(false)
  }

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

  useEffect(() => {
    fetchData()
    fetchCurrentUser()
  }, [])

  async function handleDelete() {
    await axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/')
  }

  async function handleFollow() {
    try {
      await axios.post(`/api/users/${currentUser['id']}/users/${userId}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  async function handlePositive() {
    console.log(rating)
    updateRated(true)
  }

  async function handleNegative() {
    console.log(rating)
    updateRated(true)
  }

  function handleCommentChange(event) {
    updateCommentData({ ...commentData, [event.target.name]: event.target.value })
  }

  async function handleCommentSubmit(event) {
    event.preventDefault()
    const newCommentData = {
      ...commentData
    }
    try {
      const { data } = await axios.post(`/api/users/${userId}/comments`, newCommentData,
        {
          headers: { Authorization: `Bearer ${token}` }
        })
      history.push(`/users/${userId}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }


  if (loading) {
    return <div>Page is Loading</div>
  }

  console.log(profile.follows)

  return <div className="main">

    {/*
    // * TITLE SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>User Profile</h1>
      </div>
    </section>

    {/*
    // * BODY SECTION
    */}

    <section className="section">
      <button className="button" onClick={handleDelete}>Delete profile</button>
      <button className="button">Update profile</button>

      <div className="container">
        <div className="avatar-container">
          <img src={profile.image} />
        </div>
        <div className="container">
          <p>This Baggler is rated Good</p>
          <p>Baggler: {profile.username}</p>
          <p>Bio: {profile.bio}</p>
          <p>Location: {profile.location}</p>
          <p>Rating: {profile.rating}</p>
          <p>Number of Baggles:{profile.barter_number}</p>
          <p>Successful Baggles:{profile.successful_trans}</p>
          <p>Bungled Baggles:{profile.failed_trans}</p>
        </div>
      </div>
      {currentUser['id'] !== userId && <button className="button" onClick={handleFollow}>Follow {profile.username}</button>}

    </section>

    {/*
    // * INVENTORY SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Up for baggle</h1>
        <div className="columns is-multiline">
          {profile.inventory.map((item) => {
            return <div className="column is-one-quarter" key={item.id}>
              <Link to={`/items/${item.id}`}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={item.image} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content"></div>
                    <p>{item.name}</p>
                    <p>{item.typeof}</p>
                    <p>{item.category}</p>
                    <p>Posted {item.created_at}</p>
                    <p>Wishlists: {item.wishlisted}</p>
                    <p>Comments: {item.comments.length}</p>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>

    {/*
    // * WISHLIST SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Your wishlist</h1>
        <div className="columns is-multiline">
          {profile.wishlist.map((item) => {
            return <div className="column is-one-quarter" key={item.id}>
              <Link to={`/items/${item.id}`}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={item.image} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content"></div>
                    <p>{item.name}</p>
                    <p>Belongs to {item.owner.username}</p>
                    <p>Located {item.owner.location}</p>
                    <p>Posted {item.created_at}</p>
                    <p>{item.category}</p>
                    <p>Wishlists: {item.wishlisted}</p>
                    <p>Comments: {item.comments.length}</p>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>

    {/*
    // * FOLLOWED USER SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Bagglers you follow</h1>
        <div className="columns is-multiline">
          {profile.follows.map((follow) => {
            return <div className="column is-one-quarter" key={follow.id}>
              <Link to={`/users/${follow.id}`}>
                <div className="card">
                  <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={follow.image} />
                  </figure>
                  </div>
                  <div className="card-content">
                    <div className="content"></div>
                    <p>{follow.username}</p>
                    <p>Located {follow.location}</p>
                    <p>Rating {follow.rating}</p>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>

    {/*
    // * FOLLOWER SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Bagglers who follow you</h1>
        <div className="columns is-multiline">
          {profile.followers.map((follower) => {
            return <div className="column is-one-quarter" key={follower.id}>
              <Link to={`/users/${follower.id}`}>
                <div className="card">
                  <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={follower.image} />
                  </figure>
                  </div>
                  <div className="card-content">
                    <div className="content"></div>
                    <p>{follower.username}</p>
                    <p>Located {follower.location}</p>
                    <p>Rating {follower.rating}</p>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>


    {/*
    // * COMMENTS SECTION
    */}

    <section className="section">
      <button className="button" onClick={handlePositive}>Give positive feedback</button>
      <button className="button" onClick={handleNegative}>Give negative feedback</button>
      <div>
    
  
    
  </div>
      <h1>{profile.username}'s Baggle board</h1>
      <h2>Submit a comment or review</h2>
      {profile.comments.map(comment => {
        return <article key={comment.id} className="media">
          <div className="media-content">
            <div className="content">
              <p className="title">{comment.user.username}</p>
              <p className="text">{comment.created_at}</p>
              <p className="text">{comment.content}</p>
            </div>
          </div>

          <div className="container">
            <button className="button">Delete Comment</button>
            <button className="button">Edit Comment</button>
          </div>
        </article>
      })}

      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Make a comment..."
                onChange={handleCommentChange}
                value={commentData.content}
                name={'content'}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                onClick={handleCommentSubmit}
                className="button is-info"
              >
                Submit
              </button>
            </p>
          </div>
        </div>
      </article>
    </section>

<div className="container">
  <div className="contents" style={{ height: '200px' }}>
   


<div style={{ width: "200px" }}>
<CircularProgressbarWithChildren
        value={75}
        strokeWidth={8}
        styles={buildStyles({
          pathColor: "#2B9D14",
          trailColor: "transparent"
        })}
      >
        {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
        <div style={{ width: "84%" }}>
          <CircularProgressbar
            value={70}
            styles={buildStyles({
              trailColor: "transparent",
              pathColor: "#EC2B0C"
            })}
          />

        
        </div>
      </CircularProgressbarWithChildren>
      </div>
</div>
</div>

    <section className="section">
      <h1>Profile Page Contents:</h1>
      <ul>
        <li>Avatar</li>
        <li>Bio</li>
        <li>Location</li>
        <li>Inventory - public items only if not logged in user</li>
        <li>Followed users - logged in user only</li>
        <li>Item watchlist - logged in user only</li>
        <li>Previous items provided - if items were public show all, otherwise logged in user</li>
        <li>Previous items received - logged in user only</li>
      </ul>
    </section>


  </div>

}