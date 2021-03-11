import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {


  return <div className="main">

    {/*
    // * NAVBAR SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Nav Bar</h1>
      </div>
      <div className="container">
        <ul>
          <li><Link to={'/'}><p>Home</p></Link></li>
          <li><Link to={'/about'}><p>About</p></Link></li>
          <li><Link to={'/signup'}><p>Sign up</p></Link></li>
          <li><Link to={'/login'}><p>Log in</p></Link></li>
          <li><Link to={'/profile'}><p>Profile</p></Link></li>
          <li><Link to={'/users'}><p>Find users</p></Link></li>
          <li><Link to={'/add_item'}><p>Post an ad</p></Link></li>
        </ul>
      </div>
    </section>

  </div>

}