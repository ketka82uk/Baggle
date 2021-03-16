import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getLoggedInUserId } from '../lib/auth'

import ItemForm from './ItemForm'
import ImageUpload from './ImageUpload.js'

export default function ItemAdd({ history, match }) {

  const [formData, updateFormData] = useState({
    name: '',
    typeof: '',
    category: '',
    description: '',
    image: '',
    listed: 'true'
  })
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const getUser = () => {
      const token = localStorage.getItem('token')
      if (token) {
        //change the button to logout
        setUserId(getLoggedInUserId())
      }
    }
    getUser()
  }, [])

  console.log(userId)

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    console.log('subitting item')
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('/api/items', formData, {
        headers: { Authorization: `Bearer ${token}` }

      })
      history.push(`/users/${userId}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }


  return <div className="main">

    <div className="columns">
      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <h2 className="title">Add an image</h2>
              <ImageUpload
                formData={formData}
                updateFormData={updateFormData}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <h2 className="title">Baggle details</h2>
              <ItemForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
                updateFormData={updateFormData}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
}

