import React, { useState } from 'react'
import axios from 'axios'

export default function UserLogin({ history }) {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  const [error,updateError] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
    updateError(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('api/login', formData)
      if ((localStorage) && (data.message === 'login successfull')) {
        console.log(data)
        localStorage.setItem('token', data.token)
        history.push('/')
        location.reload()
      } else {
        updateError(true)
      }
    } catch (err) {
      console.log(err.response.data)
      updateError(true)
    }
  }

  return <div className="spread">

    {/* <section className="section">
      <div className="container">
        <h1>Login</h1>
      </div>
    </section> */}

    <section className="section">
      <div className="columns">
        <div className="column"></div>
        <div className="column is-half">

          <div className="container">
            <div className="main-title-text">
              <p>Sign in to start <span style={{ color: '#B24231', fontFamily: 'Mouse Memoirs', fontSize: '50px' }}>baggling!</span></p>
            </div>
          </div>


          <div className="container">

            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Email</label>

                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    name={'email'}
                  />
                  {error && <small className="has-text-danger">Invalid email or password</small>}

                </div>
                <div className="field">
                  <label className="label">Password</label>

                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    name={'password'}
                  />
                  {error && <small className="has-text-danger">Invalid email or password</small>}
                </div>
                <button className="button is-link mt-4">Submit</button>
              </form>
            </div>

          </div>

        </div>
        <div className="column"></div>
      </div>
    </section>

    <section className="footer-filler"></section>

  </div>

}