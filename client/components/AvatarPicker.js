import React, { useState } from 'react'
import axios from 'axios'
import Avatar from 'avataaars'
import Icon from '@material-ui/core/Icon'


export default function AvatarPicker({ formData, updateFormData }) {
  
  const [hair, updateHair] = useState('NoHair')
  const [accessories, updateAccessories] = useState('Blank')
  const [hairColor, updateHairColor] = useState('Black')
  const [facialHair, updateFacialHair] = useState('Blank')
  const [clothes, updateClothes] = useState('ShirtCrewNeck')
  const [clothesColor, updateClothesColor] = useState('Gray01')
  const [skin, updateSkin] = useState('Yellow')
  const [confirmed, updateConfirmed] = useState(false)

  const hairOptions = ['NoHair', 'Hat', 'WinterHat2', 'LongHairBigHair']
  const accessoriesOptions = ['Wayfarers', 'Round', 'Kurt', 'Blank']
  const hairColorOptions = ['BlondeGolden', 'Black', 'Auburn', 'PastelPink']
  const facialHairOptions = ['BeardLight', 'Blank', 'BeardMajestic']
  const clothesOptions = ['CollarSweater', 'Hoodie', 'Overall', 'ShirtCrewNeck']
  const clothesColorOptions = ['Gray01', 'Black', 'Blue01', 'Pink', 'Red', 'White']
  const skinColorOptions = ['Yellow', 'Light', 'DarkBrown', 'Brown', 'Black']

  
  function updateAvatarData() {
    updateFormData({
      ...formData,
      avatar_hair: hair,
      avatar_accessories: accessories,
      avatar_hair_color: hairColor,
      avatar_facial_hair: facialHair,
      avatar_clothes: clothes,
      avatar_clothes_color: clothesColor,
      avatar_skin: skin,
      profile_image: `https://avataaars.io/?avatarStyle=Transparent&topType=${hair}&accessoriesType=${accessories}&hairColor=${hairColor}&facialHairType=${facialHair}&facialHairColor=${hairColor}&clotheType=${clothes}&hatColor=${clothesColor}&clotheColor=${clothesColor}&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=${skin}`
    })
    updateConfirmed(true)
  }

  return <>
    <div className="container">
        <div className="columns">

          <div className="column">Hello</div>

          <div className="column is-four-fifths">
          


      <div className="avatar-select">
        <select className="avatar-select-option" onChange={(event) => updateHair(event.target.value)}>
          {hairOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select className="avatar-select-option" onChange={(event) => updateAccessories(event.target.value)}>
          {accessoriesOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select className="avatar-select-option" onChange={(event) => updateHairColor(event.target.value)}>
          {hairColorOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select className="avatar-select-option" onChange={(event) => updateFacialHair(event.target.value)}>
          {facialHairOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select className="avatar-select-option" onChange={(event) => updateClothes(event.target.value)}>
          {clothesOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select className="avatar-select-option" onChange={(event) => updateClothesColor(event.target.value)}>
          {clothesColorOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
        <select className="avatar-select-option" onChange={(event) => updateSkin(event.target.value)}>
          {skinColorOptions.map((option, i) => {
            return <option value={option.value} key={i}>{option}</option>
          })}
        </select>
      </div>
      </div>

      <div className="column"><Icon></Icon></div>

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
    {!confirmed && <button className="button" onClick={updateAvatarData}>Confirm avatar</button>}
  </>
}
