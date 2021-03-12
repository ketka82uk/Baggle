import React, { useState } from 'react'
import axios from 'axios'

import UserSignupForm from './UserSignupForm.js'


export default function UserSignup({ history }) {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    image: '',
    bio: '',
    location: ''
  })

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const newFormData = {
      ...formData
    }
    try {
      const { data } = await axios.post('api/signup', newFormData)
      console.log(data.id)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
    }
  }


  return <div className="main">

    {/*
    // * TITLE SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>User Signup</h1>
      </div>
    </section>

    {/*
    // * BODY SECTION
    */}

    <section className="section">
      <div className="container">

        <UserSignupForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
        />

      </div>
    </section>

  </div>

}