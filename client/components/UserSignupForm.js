import React from 'react'


export default function UserSignupForm({ formData, handleSubmit, handleChange }) {


  return <div className="section">
    <div className="container">

      <form className="form">

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.username}
              onChange={handleChange}
              name={'username'} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.email}
              onChange={handleChange}
              name={'email'} />
          </div>
        </div>

        <div className="field">
          <label className="label">Postcode</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.location}
              onChange={handleChange}
              name={'location'} />
          </div>
        </div>

        <div className="field">
          <label className="label">About</label>
          <div className="control">
            <textarea
              className="textarea"
              type="text"
              value={formData.bio}
              onChange={handleChange}
              name={'bio'} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              value={formData.password}
              onChange={handleChange}
              name={'password'} />
          </div>
        </div>

        <button className="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  </div>
}