import React, { useState } from 'react'
import axios from 'axios'


export default function ImageUpload({ formData, updateFormData }) {
  const [confirmImage, updateConfirmImage] = useState(false)
  const [imageFormData, updateImageFormData] = useState({
    url: ''
  })

  async function handleImageUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dsmdafpt0',
        uploadPreset: 'looseend',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateImageFormData({
          ...imageFormData,
          url: result.info.secure_url
        })

      }
    ).open()
  }

  function UploadedImage() {
    return <div className="image-upload"><img src={imageFormData.url}></img></div>
  }

  function updateImageUrl() {
    updateFormData({
      ...formData,
      image: imageFormData.url
    })
  }

  async function handleImageSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('/api/images', imageFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data.url)
      updateImageUrl()
      updateConfirmImage(true)
    } catch (err) {
      console.log(err)
    }
  }

  return <>
    <div>
      <div className="container">
        <button className="button" onClick={handleImageUpload}>Upload image</button>
        {!imageFormData.url && <div className="image-holder">
          <div className="icon">
            <img src="https://i.imgur.com/qFTdxL6.png" alt="icon" height="20px"></img>
          </div>
          <div className="text">Your image</div>
        </div>}
        {imageFormData.url && <UploadedImage />}
        {(!confirmImage && imageFormData.url) && <button
          className="button is-danger"
          onClick={handleImageSubmit}>Confirm image</button>}
      </div>
    </div>
  </>
}
