import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator, getLoggedInUserId } from '../lib/auth.js'
import Avatar from 'avataaars'

export default function UserProfile({ match, history }) {

  const [profile, updateProfile] = useState([])
  const [loading, updateLoading] = useState(true)
  const [text, updateText] = useState('')
  const token = localStorage.getItem('token')

  const userId = match.params.userId

  console.log(userId)

  async function fetchData() {
    const { data } = await axios.get(`/api/users/${userId}`)
    updateProfile(data)
    updateLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])


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
            style={{ height: '100px' }}
            avatarStyle='Circle'
            topType='WinterHat1'
            accessoriesType='Round'
            hatColor='Red'
            facialHairType='Blank'
            clotheType='ShirtCrewNeck'
            clotheColor='Gray01'
            eyeType='Default'
            eyebrowType='Default'
            mouthType='Smile'
            skinColor='Brown'
          />
        </div>
        <div>
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
        <div className="columns is-multiline">
          {profile.inventory.map((item) => {
            return <div className="column is-one-quarter" key={item.id}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={item.image} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content"></div>
                  <p>{item.name}</p>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>


    </section>



    {/*
    // * COMMENTS SECTION
    */}

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