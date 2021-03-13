import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator, getLoggedInUserId } from '../lib/auth.js'
import Avatar from 'avataaars'

export default function UserProfile({ match, history }) {

  const [profile, updateProfile] = useState([])
  const [loading, updateLoading] = useState(true)
  const [currentUser, updateCurrentUser] = useState([])
  const [commentData, updateCommentData] = useState({
    content: '',
    positive_rating: false,
    negative_rating: false
  })
  const token = localStorage.getItem('token')

  const userId = match.params.userId
  console.log(userId)

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

  console.log(currentUser['id'])

  useEffect(() => {
    fetchData()
    fetchCurrentUser()
  }, [])

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

  console.log(profile.wishlist)

  if (loading) {
    return <div>Page is Loading</div>
  }

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

      <div className="container">
        <div className="avatar-container">
          <Avatar
            style={{ height: '200px' }}
            avatarStyle='Transparent'
            topType={profile.avatar_hair}
            accessoriesType={profile.avatar_accessories}
            hatColor={profile.avatar_clothes_color}
            facialHairType={profile.avatar_facial_hair}
            clotheType={profile.avatar_clothes}
            clotheColor={profile.avatar_clothes_color}
            eyeType='Default'
            eyebrowType='Default'
            mouthType='Smile'
            skinColor={profile.avatar_skin}
          />
        </div>
        <div className="container">
          <p>Baggler: {profile.username}</p>
          <p>Bio: {profile.bio}</p>
          <p>Location: {profile.location}</p>
          <p>Rating: {profile.rating}</p>
          <p>Number of Baggles:{profile.barter_number}</p>
          <p>Successful Baggles:{profile.successful_trans}</p>
          <p>Bungled Baggles:{profile.failed_trans}</p>
        </div>
      </div>

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
    // * COMMENTS SECTION
    */}

    <section className="section">
      <h1>Reviews for {profile.username}</h1>
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