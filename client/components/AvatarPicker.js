import React, { useState } from 'react'
import axios from 'axios'
import Avatar from 'avataaars'


export default function AvatarPicker() {
  const [formData, updateFormData] = useState({
    url: ''
  })
  const [hair, updateHair] = useState('NoHair')
  const [accessories, updateAccessories] = useState('Blank')
  const [hairColor, updateHairColor] = useState('Black')
  const [facialHair, updateFacialHair] = useState('Blank')
  const [clothes, updateClothes] = useState('ShirtCrewNeck')
  const [clothesColor, updateClothesColor] = useState('Gray01')
  const [skin, updateSkin] = useState('Yellow')

  const hairOptions = ['NoHair', 'Hat', 'WinterHat2', 'LongHairBigHair']
  const accessoriesOptions = ['Wayfarers', 'Round', 'Kurt', 'Blank']
  const hairColorOptions = ['BlondeGolden', 'Black', 'Auburn', 'PastelPink']
  const facialHairOptions = ['BeardLight', 'Blank', 'BeardMajestic']
  const clothesOptions = ['CollarSweater', 'Hoodie', 'Overall', 'ShirtCrewNeck']
  const clothesColorOptions = ['Gray01', 'Black', 'Blue01', 'Pink', 'Red', 'White']
  const skinColorOptions = ['Yellow', 'Light', 'DarkBrown', 'Brown', 'Black']

  

  // function UploadedImage() {
  //   return <div className="image-upload"><img src={imageFormData.url}></img></div>
  // }

  // function updateImageUrl() {
  //   updateFormData({
  //     ...formData,
  //     image: imageFormData.url
  //   })
  // }

  // async function handleImageSubmit(event) {
  //   event.preventDefault()
  //   const token = localStorage.getItem('token')
  //   try {
  //     const { data } = await axios.post('/api/images', imageFormData, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     console.log(data.url)
  //     updateImageUrl()
  //     updateConfirmImage(true)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return <>
    <div>
      <div className="container">
        <select onChange={(event) => updateHair(event.target.value)}>
          {hairOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select onChange={(event) => updateAccessories(event.target.value)}>
          {accessoriesOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select onChange={(event) => updateHairColor(event.target.value)}>
          {hairColorOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select onChange={(event) => updateFacialHair(event.target.value)}>
          {facialHairOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select onChange={(event) => updateClothes(event.target.value)}>
          {clothesOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select onChange={(event) => updateClothesColor(event.target.value)}>
          {clothesColorOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select onChange={(event) => updateSkin(event.target.value)}>
          {skinColorOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
      </div>
      <div className="avatar-container">
          <Avatar
            style={{ height: '200px' }}
            avatarStyle='Transparent'
            topType={hair}
            hairColor={hairColor}
            accessoriesType={accessories}
            hatColor={clothesColor}
            facialHairType={facialHair}
            facialHairColor={hairColor}
            clotheType={clothes}
            clotheColor={clothesColor}
            eyeType='Default'
            eyebrowType='Default'
            mouthType='Smile'
            skinColor={skin}
          />
        </div>
    </div>
  </>
}
