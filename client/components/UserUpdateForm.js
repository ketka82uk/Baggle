import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'

export default function UserUpdateForm({ formData, handleEditSubmit, handleEditChange }) {

  return <div className="section">
    <div className="container">

      <form className="form update-form" onSubmit={handleEditSubmit}>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.username}
              onChange={handleEditChange}
              name={'username'} />
          </div>
        </div>

        <div className="field">
          <label className="label">About</label>
          <div className="control">
            <textarea
              className="textarea"
              type="text"
              value={formData.bio}
              onChange={handleEditChange}
              name={'bio'} />
          </div>
        </div>

        <button className="button">Submit</button>
      </form>
    </div>
  </div>
}