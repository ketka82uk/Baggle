import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'

export default function ItemUpdateForm({ formData, handleEditSubmit, handleEditChange }) {

  return <div className="section">
    <div className="container">

      <form className="form" onSubmit={handleEditSubmit}>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={formData.name}
              onChange={handleEditChange}
              name={'name'} />
          </div>
        </div>

        <div className="field"></div>
        <label className="label">Type</label>
        <div className="control">
          <div className="select">
            <select
              value={formData.typeof}
              onChange={handleEditChange}
              name={'typeof'} >

              <option>Goods</option>
              <option>Service</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Category</label>
          <div className="control">
            <div className="select">
              <select
                value={formData.category}
                onChange={handleEditChange}
                name={'category'} >

                <option>Children</option>
                <option>Clothing</option>
                <option>Food And Drink</option>
                <option>Entertainment</option>
                <option>Home And Garden</option>
                <option>Motors</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              type="text"
              value={formData.description}
              onChange={handleEditChange}
              name={'description'} />
          </div>
        </div>

        <button className="button is-success">Submit</button>
      </form>
    </div>
  </div>
}