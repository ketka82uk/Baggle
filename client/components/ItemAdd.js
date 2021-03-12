import React, { useState } from 'react'
import axios from 'axios'
import ItemForm from './ItemForm'


export default function ItemAdd({ history }) {

  const [formData, updateFormData] = useState({
    name: '',
    typeof: '',
    category: '',
    description: '',
    image: '',
    listed: ''
    
  })

  function handleChange(event) {
    updateFormData({ ...formData, [event.target.name]: event.target.value })
  }


  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('/api/items', formData, {
        headers: { Authorization: `Bearer ${token}` }
        
      })
      history.push(`/cityscapes/discover/${data._id}`)
    } catch (err) {
      
      
      console.log(err.response.data)
    }
  }
  return <ItemForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formData={formData}
  />
}

// return <div className="main">

//   {/*
//   // * TITLE SECTION
//   */}

//   <section className="section">
//     <div className="container">
//       <h1>Add Item</h1>
//     </div>
//   </section>

//   {/*
//   // * BODY SECTION
//   */}

//   <section className="section">
//     <div className="container">
//       <p>Body section</p>
//     </div>
//   </section>

// </div>