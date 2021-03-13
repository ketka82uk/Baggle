import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'

export default function ItemSingle({ match, history }) {
  const itemid = match.params.itemid
  const [item, updateItem] = useState({})
  const [currentUser, updateCurrentUser] = useState([])
  const [text, setText] = useState('')
  const [loading, updateLoading] = useState(true)
  const [wishlisted, updateWishlisted] = useState(0)

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(`/api/items/${itemid}`)
        updateItem(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchItem()
  }, [])
  console.log(item)
  async function handleDelete() {
    await axios.delete(`/api/item/${itemid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/items')
  }

  
  function handleComment() {
    
    axios.post(`/api/items/${itemid}/comment`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
       
        setText('')
       
        updateItem(resp.data)
      })
  }

  
  async function handleDeleteComment(commentId) {
    
    await axios.delete(`/api/items/${itemid}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/items')
      
  }

  // ! CATHY

  async function fetchCurrentUser() {
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.get('/api/current_user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateCurrentUser(data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  console.log(currentUser['id'])
  console.log(item.wishlisted)

  useEffect(() => {
    fetchCurrentUser()
    updateLoading(false)
  }, [])

  async function handleAddToWishlist() {
    const newWishlistedTotal = item.wishlisted + 1
    updateWishlisted(newWishlistedTotal)
    console.log(newWishlistedTotal)
    try {
      await axios.put(`/api/items/${itemid}`, { wishlisted: `${newWishlistedTotal}`}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.log(err.response.data)
    }
    try {
    await axios.post(`/api/users/${currentUser['id']}/items/${itemid}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    })
      console.log("added to wishlist")
    } catch (err) {
      console.log(err.response.data)
    }
  }

  if (loading) {
    return <div>Page is Loading</div>
  }

  // ! END

  if (!item.owner) {
    return null
  }

  return <div className="columns">
    <div className="column">
      <figure className='image'>
        <img src={item.image} alt={item.name} />
      </figure>
      {isCreator(item.owner.id) && <button
        className="button is-danger"
        onClick={handleDelete}
      >☠️ Delete Item</button>}
      {isCreator(item.owner.id) && <Link
        to={`/items/${item.id}`}
        className="button is-secondary"
      >Update Item</Link>}
    </div>
    <div className="column">
      <h1 className="title">{item.name}</h1>
      <h2 className="subtitle">{`Type of : ${item.typeof}`}</h2>
      <h2 className="subtitle">{`Category: ${item.category}`}</h2>
      <h2 className="subtitle">{`Description: ${item.description}`}</h2>
      {/* <h2 className="subtitle">{`Image: ${item.image}`}</h2> */}
      <h2 className="subtitle">{`Availability: ${item.listed}`}</h2>

      <button className ="button" onClick={handleAddToWishlist}>Add to wishlist</button>

      {
        
      }
      {item.comments && item.comments.map(comment => {
        return <article key={comment._id} className="media">
          <div className="media-content">
            <div className="content">
              <p className="subtitle">
                {comment.user.username}
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
          {
            
          }
          {isCreator(comment.user.id) && <div className="media-right">
            <button
              className="delete"
              onClick={() => handleDeleteComment(comment.id)}>
            </button>
          </div>}
        </article>
      })}

      {
        
      }
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Make a comment.."
                onChange={event => setText(event.target.value)}
                value={text}
              >
                {text}
              </textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button
                onClick={handleComment}
                className="button is-info"
              >
                Submit
              </button>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
}