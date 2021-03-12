import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator, getLoggedInUserId } from '../lib/auth.js'
import Avatar from 'avataaars'

export default function UserProfile({ match, history }) {

  getLoggedInUserId()





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
      <Avatar
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