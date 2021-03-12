import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function UserList() {

  const [userData, updateUserData] = useState([])
  const [loading, updateLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/users')
      updateUserData(data)
      updateLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Page is loading</div>
  }

  return <div className="main">

    {/*
    // * TITLE SECTION
    */}

    <section className="section">
      <div className="container">
        <h1>Bagglers</h1>
      </div>
    </section>

    {/*
    // * BODY SECTION
    */}

    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {userData.map((user) => {
            return <div className="column is-one-fifth" key={user.id}>
              <Link to={`/users/${user.id}`}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={user.image} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content"></div>
                    <p>{user.username}</p>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </section>

  </div>

}