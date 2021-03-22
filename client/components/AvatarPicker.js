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

  const hairOptions = ['NoHair', 'Hat', 'WinterHat2', 'LongHairBigHair', 'LongHairFrida', 'Hijab',, 'LongHairBob', 'LongHairCurvy', 'LongHairNotTooLong', 'LongHairStraightStrand', 'ShortHairDreads2', 'ShortHairTheCaesar', 'ShortHairShaggyMullet'   ]
  const accessoriesOptions = ['Wayfarers', 'Round', 'Kurt', 'Blank', 'Prescription2']
  const hairColorOptions = ['BlondeGolden', 'Black', 'Auburn', 'PastelPink', 'Blonde', 'Brown', 'BrownDark', 'Platinum', 'Red', 'SilverGray' ]
  const facialHairOptions = ['BeardLight', 'Blank', 'BeardMajestic']
  const clothesOptions = ['CollarSweater', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'BlazerSweater', 'ShirtScoopNeck', 'ShirtVNeck']
  const clothesColorOptions = ['Gray01', 'Black', 'Blue01', 'Pink', 'Red', 'White', 'Blue02', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'White']
  const skinColorOptions = ['Yellow', 'Pale', 'Light', 'DarkBrown', 'Brown', 'Black']


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

        

        <div className="column is-half">



          <div className="avatar-select">
            <label>Hair</label>
            <select className="select" onChange={(event) => updateHair(event.target.value)}>
              {hairOptions.map((option, i) => {
                return <option value={option.value} key={i}>{option}</option>
              })}
            </select>
            <label>Glasses</label>
            <select className="select" onChange={(event) => updateAccessories(event.target.value)}>
              {accessoriesOptions.map((option, i) => {
                return <option value={option.value} key={i}>{option}</option>
              })}
            </select>
            <label>Hair color</label>
            <select className="select" onChange={(event) => updateHairColor(event.target.value)}>
              {hairColorOptions.map((option, i) => {
                return <option value={option.value} key={i}>{option}</option>
              })}
            </select>
            <label>Facial hair</label>
            <select className="select" onChange={(event) => updateFacialHair(event.target.value)}>
              {facialHairOptions.map((option, i) => {
                return <option value={option.value} key={i}>{option}</option>
              })}
            </select>
            <label>Clothes</label>
            <select className="select" onChange={(event) => updateClothes(event.target.value)}>
              {clothesOptions.map((option, i) => {
                return <option value={option.value} key={i}>{option}</option>
              })}
            </select>
            <label>Clothes colour</label>
            <select className="select" onChange={(event) => updateClothesColor(event.target.value)}>
              {clothesColorOptions.map((option, i) => {
                return <option value={option.value} key={i}>{option}</option>
              })}
            </select>
            <label>Skin color</label>
            <select className="select" onChange={(event) => updateSkin(event.target.value)}>
              {skinColorOptions.map((option, i) => {
                return <option value={option.value} key={i}>{option}</option>
              })}
            </select>
          </div>

          
        </div>
        <div className="column">
         
          <div className="avatar-container mt-4">
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
          <div className="container mt-4 quote-text">
          Create your own baggler to look however you want!</div>
          <div className="container mt-4">
            <p>(You can change the boring background later).</p></div>
        </div>

      </div>


    </div>
    {!confirmed && <button className="button is-info" onClick={updateAvatarData}>Click to confirm avatar</button>}
  </>
}
