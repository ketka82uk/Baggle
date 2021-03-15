import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'
import '../styles/style.scss'



export default function ItemSingle({ match, history }) {
  const itemid = match.params.itemid
  const [item, updateItem] = useState({})
  const [currentUser, updateCurrentUser] = useState([])
  const [text, setText] = useState('')
  const [loading, updateLoading] = useState(true)
  const [wishlisted, updateWishlisted] = useState(0)
  const [userData, updateUserData] = useState([])
  const [modalState, setModalState] = useState(false)
  const [currentUserInventory, updateCurrentUserInventory] = useState([])
  const [offeredItemid, updateOfferedItemid] = useState(0)
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
  // console.log(item)




  // function handleChange(event) {
  //   const { name, value } = event.target
  //   updateOfferedItemid({ ...offeredItemid, [name]: value })
  // }

  // async function handleSubmit(event) {
  //   event.preventDefault()
  //   const token = localStorage.getItem('token')

  //   const newFormData = {
  //     ...offeredItemid
  //   }
  //   try {
  //     const { data } = await axios.post('/api/offers/5/4', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     console.log(data._id)
  //     history.push(`/items/${data.item}`)
  //   } catch (err) {
  //     console.log(err.response.data)
  //   }
  // }

  // console.log(itemid)
  // useEffect(() => {
  //   async function fetch() {
  //     try {
  //       const { data } = await axios.put('/api/offers/5/20')
  //       updateItem(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  //   fetch()
  // }, [])






  async function handleDelete() {
    await axios.delete(`/api/item/${itemid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    history.push('/items')
  }
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/users')
      updateUserData(data)
      updateLoading(false)
    }
    fetchData()
  }, [])
  // console.log(userData)

  const toggleModal = () => {
    setModalState(!modalState)
  }



  async function handleComment() {

    const { data } = await axios.post(`/api/items/${itemid}/comments`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })


    setText('')

    updateItem(data)

  }

  async function fetchCurrentUserInventory() {
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.get('/api/current_user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateCurrentUserInventory(data.inventory)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {

    fetchCurrentUserInventory()
  }, [])


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


  // console.log(item.wishlisted)

  useEffect(() => {
    fetchCurrentUser()
    updateLoading(false)
  }, [])

  async function handleAddToWishlist() {
    const newWishlistedTotal = item.wishlisted + 1
    updateWishlisted(newWishlistedTotal)
    console.log(newWishlistedTotal)
    try {
      await axios.put(`/api/items/${itemid}`, { wishlisted: `${newWishlistedTotal}` }, {
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
  console.log(currentUserInventory['index'])
  console.log(currentUser)
  // console.log(currentUser['inventory.id'])

  return <div className="columns">
    <div className="Mod">
      <div className={`modalBackground modalShowing-${modalState}`}>
        <div className="innerModal">
          <div className="modalImage">
            <img src="https://images.unsplash.com/photo-1615558254521-201fe44dbf8e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt={item.name}
            />
          </div>
          <div className="modalText">
            <h2> Would you like to make an offer?</h2>

            <form action="">
              {currentUserInventory.map((item, index) => {
                return <div key={index} >
                  <div>
                    <button className="request" onClick={() => handleSubmit()}>   {item.name}  </button>
                  </div>
                </div>

              })}
            </form>
            <button className="exit" onClick={() => toggleModal()}>
              Exit
          </button>

          </div>
        </div>

      </div>
      <button onClick={() => toggleModal()}>Baggle</button>
    </div>
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
      {/* <h2 className="subtitle">{`Image: ${item.owner.image}`}</h2> */}
      <h2 className="subtitle">{`Availability: ${item.listed}`}</h2>


      <button className="button" onClick={handleAddToWishlist}>Add to wishlist</button>

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
        <figure className="image is-128x128">
          <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
        </figure>

      }
      {/* <div className="Mod">
        <div className={`modalBackground modalShowing-${modalState}`}>
          <div className="innerModal">
            <div className="modalImage">
              <img src="https://images.unsplash.com/photo-1615558254521-201fe44dbf8e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt={item.name}
              />
            </div>
            <div className="modalText">
              <h2> Would you like to make an offer?</h2>

              <form action="">
                {currentUserinventory.map((item, index) => {
                  return <div key={index}>
                    <div>
                      <button>   {item.name}  </button>
                    </div>
                  </div>

                })}
              </form>
              <button className="exit" onClick={() => toggleModal()}>
                Exit
          </button>

            </div>
          </div>

        </div>
        <button onClick={() => toggleModal()}>Baggle</button>
      </div> */}

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


{/* <toggleModal
         handleChange={handleChange}
         handleSubmit={handleSubmit}
         offeredItemid={offeredItemid}
         /> */}



      //    <div className="Mod">
      //    <div className={`modalBackground modalShowing-${modalState}`}>
      //      <div className="innerModal">
      //        <div className="modalImage">
      //          <img src="https://images.unsplash.com/photo-1615558254521-201fe44dbf8e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt={item.name}
      //          />
      //        </div>
      //        <div className="modalText">
      //          <h2> Would you like to make an offer?</h2>

      //          <form action="">
      //            {currentUserInventory.map((item, index) => {
      //              return <div key={index} >
      //                <div>
      //                  <button>   {item.name}  </button>
      //                </div>
      //              </div>

      //            })}
      //          </form>
      //          <button className="exit" onClick={() => toggleModal()}>
      //            Exit
      //        </button>

      //        </div>
      //      </div>

      //    </div>
      //    <button onClick={() => toggleModal()}>Baggle</button>
      //  </div>