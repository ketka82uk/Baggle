import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Slider from "react-slick";

export default function Carousel( { items, category } ) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2
  }

  function filterItems(category) {
    console.log('filtering items...')
    return items.filter((item) => {
      return item.category === category
    })
  }

  function mapItems(itemArray) {
    return itemArray.map((item, i) => {
      return <div key={i}>
        <div className="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src={item.image} alt="Placeholder image"/>
            </figure>
          </div>
        </div>
        <div className="card-content">
          <div class="content">
            <p class="title is-4">{item.name}</p>
            <Link to={`/items/${item.id}`}>
              <div className="button">Go to</div>
            </Link>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>
    })
  }

  return <div>
    <p className="title is-3">{category}</p>
    <Slider {...settings}>
      {mapItems(filterItems(category))}
    </Slider>
  </div>
}