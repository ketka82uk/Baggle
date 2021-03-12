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
        <div className="navbar-brand">
          <div className="navbar-item">
            NOT FOR SALE
          </div>
          <span className="navbar-item is-active">
            <Link to={'/'}><p>Home</p></Link>
          </span>
          <span className="navbar-item">
            <Link to={'/users'}><p>Users</p></Link>
          </span>
          <span className="navbar-item">
            <Link to={'/items'}><p>Items</p></Link>
          </span>
          <span className="navbar-item">
            <Link to={'/about'}><p>About</p></Link>
          </span>
          <span className="navbar-burger" data-target="navbarMenuHeroA">
            <span></span>
          </span>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            {!logIn ? <span>
                <div className="navbar-item">
                  <Link to={'/signup'}><p>Sign up</p></Link>
                </div>
                <div className="navbar-item">
                  <Link to={'/login'}><p>Log in</p></Link>
                </div> 
              </span> :
              <span>
                <div className="navbar-item">{userName && <strong>Hi {userName}</strong>}</div>
                <div className="navbar-item">
                  <Link to={'/profile'}><p>My profile</p></Link>
                </div>
                <span className="navbar-item">
                  <Link to={'/add_item'}><p>Post A baggle</p></Link>
                </span>
                <div className="button navbar-item is-primary" onClick={logOut}>
                  <strong>Log Out</strong>
                </div>
              </span>
            }
          </div>
        </div>
      </div>

  </div>

}