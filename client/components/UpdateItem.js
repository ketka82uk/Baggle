import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'


import ItemForm from './ItemForm'

export default function UpdateItem({ history, match }) {
  const item = match.params.itemId

  const [loading, updateLoading] = useState(true)

  const [formData, updateFormData] = useState({
    name: '',
    typeof: '',
    category: '',
    description: '',
    image: '',
    listed: ''
    
  })
  

  useEffect(() => {
    async function getFormData() {
      const { data } = await axios.get(`/api/items/${item}`)
      
      console.log(data)
      updateFormData(data)
      updateLoading(false)
    }


    getFormData()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')

    const newFormData = {
      ...formData
    }
    try {
      const { data } = await axios.put(`/api/items/${item}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      history.push(`/items/${data.item}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  }
  return <ItemForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}