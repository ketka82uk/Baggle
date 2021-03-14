import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'

export default function Carousel( { items, category } ) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2
  }

  function sortedItems() {
    return items.sort(function(a, b) {
      return a.created_at - b.created_at
    }).reverse()
  }

  function filterItems(category) {
    return sortedItems().filter((item) => {
      return item.category === category
    })
  }

  function cleanCat() {
    const clean = category.replace(/_/g, ' ')
    const catSplit = clean.split('')
    const capCat = (catSplit[0].toUpperCase()).concat(catSplit.splice(1,catSplit.length))
    return capCat.replace(/,/g, '')
  }

  function mapItems(itemArray) {
    const limitedItems = itemArray.slice(0,7)
    return limitedItems.map((item, i) => {
      return <div key={i}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={item.image} alt="Placeholder image"/>
            </figure>
          </div>
        </div>
        <div className="card-content">
          <div className="content">
            <p className="title is-4">{item.name}</p>
            <Link to={`/items/${item.id}`}>
              <div className="button">Go to</div>
            </Link>
            <time dateTime="2016-1-1">{item.created_at}</time>
          </div>
        </div>
      </div>
    })
  }

  return <div className="has-text-left">
    <p className="title is-3">{cleanCat()}</p>
    <Slider {...settings}>
      {mapItems(filterItems(category))}
    </Slider>
  </div>
}