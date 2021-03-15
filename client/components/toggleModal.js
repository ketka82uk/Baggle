import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'


export default function funcModal({ match }) {

  const itemid = match.params.itemid
  const [item, updateItem] = useState([])

  const [loading, updateLoading] = useState(true)
  const [modalState, setModalState] = useState(false)
  const [profile, updateProfile] = useState([])

  const [currentUser, updateCurrentUser] = useState([])
  const token = localStorage.getItem('token')
  const userId = match.params.userId
  const [modalOpen, setModalOpen] = useState(false)


  useEffect(() => {
    async function getList() {
      try {
        const { data } = await axios.get('/api/items')
        updateItem(data)
        updateLoading(false)
        // console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getList()
  }, [])

  const toggleModal = () => {
    setModalState(!modalState)
  }

  async function fetchData() {
    const { data } = await axios.get(`/api/users/${userId}`)
    updateProfile(data)
    updateLoading(false)
  }

  async function fetchCurrentUser() {
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.get('/api/current_user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateCurrentUser(data.inventory)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  console.log(currentUser)

  useEffect(() => {
    fetchData()
    fetchCurrentUser()
  }, [])


  // const makeOffer = () => {

  //   }


  return (<div className="Mod">
    <div className={`modalBackground modalShowing-${modalState}`}>
      <div className="innerModal">
        <div className="modalImage">
          <img src="https://images.unsplash.com/photo-1615558254521-201fe44dbf8e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt={item.name}
          />
        </div>
        <div className="modalText">
          <h2> Would you like to make an offer?</h2>

          <form action="">
            {currentUser.map((item, index) => {
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
  </div>

  )

}








// return (
//   <div className="tm">
//     <button onClick={() => setModalOpen(true)}>Open </button>
//     <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
//       <h2>Modal</h2>
//       <p>text</p>
//       <div>
//         <button onClick={() => setModalOpen(false)}>Close</button>
//       </div>
//     </Modal>
//   </div>
// )