import axios from 'axios'
import React, { useState, useEffect, Component } from 'react'
import { Link } from 'react-router-dom'

import Carousel from './Carousel'


export default function Home() {
  const [items, updateItems] = useState([])
  // const [categories, updateCategories] = useState([])

  const categories = ['entertainment', 'clothing', 'home_and_garden', 'food_and_drink', 'motor', 'children']
  // const type = ['services', 'goods']

  useEffect(() => {
    axios.get('/api/items')
      .then(resp => {
        updateItems(resp.data)
      })
  }, [])

  return <div className="main">

    <section className="hero is-primary is-medium">
      <div className="hero-body has-text-centered">
        <p className="title">
          Not for sale
        </p>
        <p className="subtitle">
          Start bartering...
        </p>
      </div>
    </section>

    <section>
      <div className="container is-max-widescreen">
        {categories.map((category, i) => {
          return <div className='section' key={i}>
              <Carousel items={items} category={category}/>
          </div>
        })}
      </div>
    </section>

  </div>

}

