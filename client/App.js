import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import axios from 'axios'
import 'bulma'

import About from './components/About.js'
import Footer from './components/Footer.js'
import Home from './components/Home.js'
import ItemAdd from './components/ItemAdd.js'
import ItemList from './components/ItemList.js'
import ItemSingle from './components/ItemSingle.js'
import Navbar from './components/Navbar.js'
import UserList from './components/UserList.js'
import UserLogin from './components/UserLogin.js'
import UserProfile from './components/UserProfile.js'
import UserSignup from './components/UserSignup.js'
// import UserSignupForm from './components/UserSignupForm.js'
import UpdateItem  from './components/UpdateItem.js'

import 'bulma'


// ! Some starter code for your frontend, change this
// ! however you like.
const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/test/backend" component={TestBackend} />
      <Route exact path="/about" component={About} />
      <Route exact path="/add_item" component={ItemAdd} />
      <Route exact path="/items" component={ItemList} />
      <Route exact path="/items/:itemId" component={UpdateItem} />
      <Route exact path="/single_item" component={ItemSingle} />
      <Route exact path="/users" component={UserList} />
      <Route exact path="/login" component={UserLogin} />
      <Route exact path="/users/:user_id" component={UserProfile} />
      <Route exact path="/signup" component={UserSignup} />
      
    </Switch>
    <Footer />
  </BrowserRouter>
)

// const Home = () => <Link to={'/test/backend'}>
//   Go to /hello/world page.
// </Link>

// ! Just a little component to test that you can talk to your flask server, check if it
// ! works in network tab.
const TestBackend = () => {
  useEffect(() => {
    // ? This is going to try localhost:5000/api
    axios.get('/api')
      .then(({ data }) => console.log(data))
  }, [])

  return <p>
    Hello World
  </p>
}

export default App