import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

export default function ItemList({ match }) {
  const itemid = match.params.itemid
  const [items, updateItems] = useState([])
  const [loading, updateLoading] = useState(true)
  console.log(itemid)
  useEffect(() => {
    async function getList() {
      try {
        const { data } = await axios.get('/api/items')
        updateItems(data)
        updateLoading(false)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getList()
  }, [])

  if (loading) {
    return <ClipLoader loading={loading} size={100} />
  }
  return <section className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {items.map((item, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/items/${item.id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{item.name}</p>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={item.image} alt={item.name} />
                  </figure>
                </div>
              </div>
            </Link>
          </div>
        })}
        
      </div>
    </div>
  </section>
}

// return <div className="main">

//   {/*
//   // * TITLE SECTION
//   */}

//   <section className="section">
//     <div className="container">
//       <h1>Item List</h1>
//     </div>
//   </section>

//   {/*
//   // * BODY SECTION
//   */}

//   <section className="section">
//     <div className="container">
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//       <div><a><Link to={'/single_item'}>Filtered Item</Link></a></div>
//     </div>
//   </section>

// </div>