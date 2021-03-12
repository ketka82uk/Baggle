import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {


  return <div className="main">

    {/*
    // * TITLE SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Home</h1>
      </div>
    </section>

    {/*
    // * BODY SECTION
    */}

    <section className="section">
      <div className="container">
        <Link to={'/test/backend'}>
          <p>Go to /hello/world page.</p>
        </Link>
      </div>
    </section>

    <section className="section">
      <h1>Home Page Contents:</h1>
      <ul>
        <li>Logo</li>
        <li>Mission statement</li>
        <li>Search for items</li>
        <li>Filter by goods or services and category</li>
        <li>Filter by location</li>
        <li>Logged in user sees suggested items according to their location and barter history</li>
      </ul>
      <button><Link to={'/items'}>Search</Link></button>
    </section>

  </div>

}