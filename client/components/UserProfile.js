import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId, isCreator } from '../lib/auth.js'
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Moment from 'react-moment'
import Icon from '@material-ui/core/Icon'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Avatar from '@material-ui/core/Avatar'
import UserUpdateForm from './UserUpdateForm.js'
import ImageUpload from './ImageUpload.js'

export default function UserProfile({ match, history }) {

  const [profile, updateProfile] = useState([])
  const [loading, updateLoading] = useState(true)
  const [positiveRating, updatePositiveRating] = useState(0)
  const [negativeRating, updateNegativeRating] = useState(0)
  const [rated, updateRated] = useState(false)
  const [user, updateUser] = useState('')
  const [logIn, updateLogin] = useState(false)
  const [isProfileOwner, updateIsProfileOwner] = useState(false)
  const [currentUserId, setCurrentUserId] = useState(0)
  const [currentUser, updateCurrentUser] = useState({})
  const [editState, updateEditState] = useState(false)
  const [reviewData, updateCommentData] = useState({
    content: '',
    positive_rating: false,
    negative_rating: false
  })
  const [formData, updateFormData] = useState({
    username: '',
    bio: '',
    image: '',
  })


  // ! GETS USER DATA AND COMPARES LOGGED IN USER TO PROFILE OWNER

  const userId = Number(match.params.userId)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const handleLogin = () => {
      if (token) {
        setCurrentUserId(getLoggedInUserId())
      }
    }
    handleLogin()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/api/users/${userId}`)
        updateProfile(data)
        updateUser(data.id)
        const totalRatings = data.positive_rating + data.negative_rating
        const positivePercent = data.positive_rating / totalRatings * 100
        const negativePercent = data.negative_rating / totalRatings * 100
        updatePositiveRating(positivePercent)
        updateNegativeRating(negativePercent)
        updateFormData({ username : data.username, bio : data.bio })
        updateLoading(false)
      } catch (err) {
        console.log(err)
      }
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




  //! FILTER FUNCTIONS

  function profileFollowsYou() {
    if(profile.follows.includes(currentUser)) {
      console.log('They follow me')
    } else {'They don\'t follow me'}
  }

  


  //! DELETE AND EDIT FUNCTIONS

  async function handleDelete() {
    await axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/')
  }

  async function handleFollow() {
    try {
      await axios.post(`/api/users/${currentUserId}/users/${userId}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // ! 9x9 MAPPING FUNCTIONS

  function mapGrid(itemArray) {
    filterItems(itemArray)
    const limitedItems = itemArray.slice(0, 9)
    return limitedItems.map((item, i) => {
      return <div className="column is-one-third" key={i}>
        <Link to={`/items/${item.id}`}>
          <div className="card">
            <div className="card-image">
              <figure className="image is-square">
                <img src={item.image} />
              </figure>
            </div>
          </div>
        </Link>
      </div>
    })
  }

  function filterItems(itemArray) {
    const filteredItems = itemArray.filter((item) => {
      return item.listed
    })
  }

  // ! HANDLE SUBMIT AND CHANGE FUNCTIONS

  async function handlePositive() {
    const originalPositive = profile.positive_rating
    const newPositive = originalPositive + 1
    const newProfileData = { positive_rating: newPositive }
    try {
      const { data } = await axios.put(`/api/users/${userId}`, newProfileData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      location.reload()
    } catch (err) {
      console.log(err.response.data)
    }
  }

  async function handleNegative() {
    const originalNegative = profile.negative_rating
    const newNegative = originalNegative + 1
    const newProfileData = { negative_rating: newNegative }
    try {
      const { data } = await axios.put(`/api/users/${userId}`, newProfileData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      location.reload()
    } catch (err) {
      console.log(err.response.data)
    }
  }


  function handleReviewChange(event) {
    updateCommentData({ ...reviewData, [event.target.name]: event.target.value })
  }

  async function handleReviewSubmit(event) {
    event.preventDefault()
    const newReviewData = { ...reviewData }
    try {
      const { data } = await axios.post(`/api/users/${userId}/review`, newReviewData,
        {
          headers: { Authorization: `Bearer ${token}` }
        })
      location.reload()
    } catch (err) {
      console.log(err.response.data)
    }
  }

  async function handleReviewDelete(reviewId) {
    // event.preventDefault()
    try {
      axios.delete(`/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      location.reload()
    } catch (err) {
      console.log(err.response.data)
    }
  }

  function handleEditChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleEditSubmit(event) {
    event.preventDefault()
    const newFormData = {
      ...formData
    }
    try {
      await axios.put(`/api/users/${currentUserId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('editing data user')
      updateEditState(false)
      location.reload()
    } catch (err) {
      console.log('ERROR!')
      console.log(err)
    }
  }

  function toggleEditState() {
    updateEditState(true)
  }


  if (loading) {
    return <div>Page is Loading</div>
  }

  // ! RENDERING


  return <div className="main">

    <div className="container">

      {/*
    // * TITLE SECTION
    */}

      <section className="hero is-small">
        <div className="hero-body banner-with-image" style={{
          backgroundImage: `url(${profile.image})`,
          backgroundSize: 'cover'
        }}>
          <div className="container has-text-centered">
            <div className="banner-profile-image-container">
              <img src={profile.profile_image} />
            </div>
            <div className="banner-text">
              <p>{profile.username}</p>
            </div>
          </div>
        </div>

        {/*
        // * NAVBAR SECTION
        */}

        <div className="hero-foot">
          <nav className="tabs is-boxed is-fullwidth">
            <div className="container my-2">
              <ul>
                <li>
                  <a onClick={profileFollowsYou()}>Profile</a>
                </li>
                <li>
                  <a>Up for Baggle</a>
                </li>
                <li>
                  <a>Wishlist</a>
                </li>
                <li>
                  <a>Baggle Buddies</a>
                </li>
                <li><a>Delete Profile</a></li>
                <li><button className="button" onClick={handleFollow}>Follow {profile.username}</button></li>
                <li><a>Unfollow</a></li>

              </ul>
            </div>
          </nav>
        </div>
      </section>

      {/*
        // * BODY SECTION
      */}

      <section className="section">
        <div className="columns">


          {/*
            // ! COLUMN 1
            */}

          <div className="column">

            {/*
            // * ABOUT SECTION
            */}

            <article className="tile box is-vertical">
              <div className="contents">
                <div className="grid-header">
                  <h2 className="title">About</h2>
                  {!isCreator(userId) && <button className="button">Contact</button>}
                  {isCreator(userId) && <button className="button" onClick={toggleEditState}>Edit profile  <Icon>create</Icon></button>}
                </div>

                {/* {!isCreator(userId) && <div className="tags has-addons mb-0">
                  <span className="tag">{profile.username}</span>
                  <span className="tag is-primary">follows you</span>
                </div>}

                <div className="tags has-addons mb-0">
                  <span className="tag">{profile.username}</span>
                  <span className="tag is-danger">doesn't follow you</span>
                </div> */}

                {editState === false ?
                <div className="contents">
                  <div className="container mb-4">
                  <label>Username</label>
                  <p>{profile.username}</p>
                  </div>
                  <div className="container mb-4">
                  <label>Location</label>
                  <p>{profile.location}</p>
                  </div>
                  <div className="container mb-4">
                  <label>Bio</label>
                  <p>{profile.bio}</p>
                  </div>
                  
                  {profile.created_at && <p>Baggling since <span className="red-text"><Moment format="Do MMM YYYY">{profile.created_at}</Moment></span></p>}
                </div> :
                <div>
                <UserUpdateForm
                  handleEditSubmit={handleEditSubmit}
                  handleEditChange={handleEditChange}
                  formData={formData}
                />
                <ImageUpload
                  formData={formData}
                  updateFormData={updateFormData}  
                /> 
                </div> 
              }
              
              </div>
            </article>

            {/*
            // * BUDDY SECTION
            */}

            <article className="tile box is-vertical">
              <div className="contents">
                <div className="grid-header">
                  <h2 className="title">Baggling Buddies</h2>
                  <button className="button">See All</button>
                </div>
                <AvatarGroup max={10}>
                
                  {profile.follows.map((follow) => {
                    return <Link to={`/users/${follow.id}`}><Avatar
                      alt={follow.username}
                      key={follow.id}
                      src={follow.profile_image}
                      style={{
                        height: '100px',
                        width: '100px',
                        backgroundImage: `url(${follow.image})`,
                        backgroundSize: 'cover'
                      }} /></Link>
                  })}
                  
                </AvatarGroup>
              </div>
            </article>

            {/*
            // * RATING SECTION
            */}

            <article className="tile box is-parent is-vertical pb-5">

              <div className="tile is-child py-2 px-2">
                <div className="contents">
                  <div className="grid-header">
                    <h2 className="title">Baggler Ratings</h2>
                    <button className="button">See All</button>
                  </div>
                </div>
              </div>

              <div className="tile is-child">
                <div className="tile is-parent">
                  <div style={{ width: "200px" }}>
                    <CircularProgressbarWithChildren
                      value={positiveRating}
                      strokeWidth={8}
                      styles={buildStyles({
                        pathColor: "green",
                        trailColor: "transparent"
                      })}
                    >
                      <div style={{ width: "84%" }}>
                        <CircularProgressbar
                          value={negativeRating}
                          styles={buildStyles({
                            trailColor: "transparent",
                            pathColor: "#B24231"
                          })}
                        />
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="rating-container">
                    <div className="pos-rating"><p>{Math.floor(positiveRating)}% 👍<Icon>thumbUp</Icon></p></div>
                    <div className="neg-rating"><p>{Math.floor(negativeRating)}% 👎</p></div>
                  </div>
                </div>
              </div>

              <div className="tile is-child">
                <div className="contents">
                  {positiveRating < 50 && <div>{profile.username} is a bad Baggler!</div>}
                  {positiveRating >= 50 && positiveRating < 70 && <div>{profile.username} is rated Neutral</div>}
                  {positiveRating >= 70 && positiveRating < 95 && <div>{profile.username} is rated Good</div>}
                  {positiveRating >= 95 && <div>{profile.username} is a Top Baggler</div>}
                </div>
              </div>
            </article>

            {/*
            // * WISHLIST SECTION
            */}

            {isCreator(userId) && <article className="tile box is-vertical">
              <div className="contents">
                <div className="grid-header">
                  <h2 className="title">Wishlist</h2>
                  <button className="button">See All</button>
                </div>
                <div className="contents">
                  <div className="grid-container">
                    <div className="columns is-multiline">
                      {mapGrid(profile.wishlist)}
                    </div>
                  </div>
                </div>
              </div>
            </article>}
          </div>


          {/*
            // ! COLUMN 2
            */}


          <div className="column is-three-fifths">



            {/*
            // * INVENTORY SECTION
            */}

            <article className="tile box is-vertical">
              <div className="contents">
                <div className="grid-header">
                  <h2 className="title">Up for Baggle</h2>
                  <button className="button">See All</button>
                </div>
                <div className="contents">
                  <div className="grid-container">
                    <div className="columns is-multiline">
                      {mapGrid(profile.inventory)}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/*
            // * REVIEW SECTION
            */}

            <article className="tile box is-vertical">
              <div className="contents">
                <div className="grid-header">
                  <h2 className="title">Baggle Board</h2>
                </div>
                <div className="contents">
                  Reviews goes here
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>





      <section className="section">
        <button className="button" onClick={handlePositive}>Give positive feedback</button>
        <button className="button" onClick={handleNegative}>Give negative feedback</button>
        <div>



        </div>
        <h1>{profile.username}'s Baggle board</h1>
        <h2>Submit a comment or review</h2>
        {profile.other_reviews.map(review => {
          return <article key={review.id} className="media">
            <div className="media-content">
              <div className="content">
                <p className="title">{review.author.username}</p>
                <p className="text">{review.created_at}</p>
                <p className="text">{review.content}</p>
              </div>
            </div>

            <div className="container">
              {isCreator(review.author.id) && <button 
                className="button"
                onClick={() => handleReviewDelete(review.id)}
              >Delete Review</button>}
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
                  onChange={handleReviewChange}
                  value={reviewData.content}
                  name={'content'}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button
                  onClick={handleReviewSubmit}
                  className="button is-info"
                >
                  Submit
              </button>
              </p>
            </div>
          </div>
        </article>
      </section>




    </div>
  </div>

}