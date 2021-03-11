import React from 'react'
import { Link } from 'react-router-dom'

export default function ItemList() {


  return <div className="main">

    {/*
    // * TITLE SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Item List</h1>
      </div>
    </section>

    {/*
    // * BODY SECTION
    */}

    <section className="section">
      <div className="container">
        <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
        <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
        <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
        <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
        <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
      </div>
    </section>

  </div>

}