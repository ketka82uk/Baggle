import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './styles/style.scss'
import './styles/font_test.scss'
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
import UserSignupForm from './components/UserSignupForm.js'
import UpdateItem  from './components/UpdateItem.js'
import TestLogo from './components/TestLogo.js'
import toggleModal from './components/toggleModal.js'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/add_item" component={ItemAdd} />
      <Route exact path="/items" component={ItemList} />
      <Route exact path="/items/update/:itemid" component={UpdateItem} />
      <Route exact path="/items/:itemid" component={ItemSingle} />
      <Route exact path="/users" component={UserList} />
      <Route exact path="/login" component={UserLogin} />
      <Route exact path="/users/:userId" component={UserProfile} />
      <Route exact path="/signup" component={UserSignup} />
      <Route exact path="/test/fonts" component={TestLogo} />
      <Route exact path="/modal" component={toggleModal} />
    </Switch>
    <Footer />
  </BrowserRouter>
)

export default App