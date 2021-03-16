import React, { useState } from 'react'
import axios from 'axios'

import UserSignupForm from './UserSignupForm.js'
import AvatarPicker from './AvatarPicker.js'
import ImageUpload from './ImageUpload.js'


export default function UserSignup({ history }) {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    location: '',
    lat: 0,
    lng: 0,
    password: '',
    bio: '',
    avatar_hair: '',
    avatar_accessories: '',
    avatar_hair_color: '',
    avatar_facial_hair: '',
    avatar_clothes: '',
    avatar_clothes_color: '',
    avatar_skin: ''
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    location: ''
  })

  const [registrationSuccess, updateRegistrationSuccess] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
    updateErrors({ ...errors, [name]: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const newFormData = {
      ...formData
    }
    delete newFormData.search
    try {
      for (const [key, value] of Object.entries(newFormData)) {
        if (value === '') {
          console.log(`error found in ${key}`)
          updateErrors({
            ...errors,
            [key]: `Please provide ${key}` 
          })
          return
        }
      }

      const { data } = await axios.post('api/signup', newFormData)
      updateRegistrationSuccess(true)
      console.log('signing up user')
      history.push('/login')
    } catch (err) {
      console.log('ERROR!')
      console.log({ err })
    }
  }
  console.log(formData)
  console.log(errors)

  return <div className="main">

    <section className="section">
      <div className="container">
        <h1>User Signup</h1>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <AvatarPicker
          formData={formData}
          updateFormData={updateFormData} />
      </div>
      {/* {errors.username && <small className="has-text-danger">Invalid username</small>} */}
      <div className="container">

        <UserSignupForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          updateFormData={updateFormData}
          errors={errors}
          registrationSuccess={registrationSuccess}
        />

      </div>
    </section>

  </div>

}