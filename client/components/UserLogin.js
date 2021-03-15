import React, { useState } from 'react'
import axios from 'axios'

export default function UserLogin({ history }) {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('api/login', formData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
      }
      history.push('/')
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
        <h1>Login</h1>
      </div>
    </section>

    <div>Update so that you're pushed to profile after login</div>

    {/*
    // * BODY SECTION
    */}

    <section className="section">
      <div className="container">

        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Email</label>

              <input
                className="input"
                type="email"
                placeholder="<img>Email"
                value={formData.email}
                onChange={handleChange}
                name={'email'}
              />
              

            </div>
            <div className="field">
              <label className="label">Password</label>

              <input
                className="input"
                type="password"
                placeholder="<img> Password"
                value={formData.password}
                onChange={handleChange}
                name={'password'}
              />
              
            </div>
            <button>Submit</button>
          </form>
        </div>



      </div>
    </section>

  </div>

}