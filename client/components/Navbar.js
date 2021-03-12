import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'
import axios from 'axios'

export default function Navbar() {
  const [logIn, updateLogin] = useState(false)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')

  // get logged in token for current user
  useEffect(() => {
    const handleLogin = () => {
      const token = localStorage.getItem('token')
      if (token) {
        //change the button to logout
        updateLogin(true)
        setUserId(getLoggedInUserId())
      }
    }
    handleLogin()
  }, [])

  // get current logged in user, to personalise NavBar
  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`/api/user/${userId}`)
        setUserName(data.username)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [userId])

  //loggingOut
  function logOut() {
    localStorage.removeItem('token')
    location.reload()
  }

  return <div className="navbar">
    <div className="container">
      <div className="container">
        <h1>NOT FOR SALE</h1>
      </div>
      <div className="container">
        <ul>
          <li><Link to={'/'}><p>Home</p></Link></li>
          <li><Link to={'/users'}><p>Users</p></Link></li>
          <li><Link to={'/items'}><p>Items</p></Link></li>
          <li><Link to={'/about'}><p>About</p></Link></li>

          {!logIn ? 
          <div>
            <li><Link to={'/signup'}><p>Sign up</p></Link></li>
            <li><Link to={'/login'}><p>Log in</p></Link></li>
          </div> :
           <div>
             <div>{userName && <strong>Hi {userName}</strong>}</div>
            <li><Link to={'/profile'}><p>My profile</p></Link></li>
            <li><Link to={'/add_item'}><p>Create</p></Link></li>
            <button className="button is-primary" onClick={logOut}>
              <strong>Log Out</strong>
            </button>
           </div>
          }
        </ul>
      </div>
    </div>

  </div>

}