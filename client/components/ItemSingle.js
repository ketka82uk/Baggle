import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemSingle() {


  return <div className="main">

    {/*
    // * TITLE SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Single Item</h1>
      </div>
    </section>

    {/*
    // * BODY SECTION
    */}

    <section className="section">
      <div className="container">
        <p>Body section</p>
        <button><Link to={'/items'}>Back</Link></button>
      </div>
    </section>

  </div>

}