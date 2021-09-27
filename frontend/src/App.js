import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import { connect } from 'react-redux'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import ProfileEdit from './pages/ProfileEdit/ProfileEdit'
import Product from './pages/Product/Product'
import Shop from './pages/Shop/Shop'
import Search from './pages/Search/Search'
import Category from './pages/Category/Category'
import { getProfile } from './redux/actions/user'
import axios from './axios'
import './App.css'

const App = (props) => {
  const token = localStorage.getItem('CANOPY_TOKEN')
  if (token) {
    axios.defaults.headers.common.Authorization = token

    props.getProfile().catch(() => {
      // logout()
    })
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile/edit" exact component={ProfileEdit} />
          <Route path="/profile" component={Profile} />
          <Route path="/products/:id" component={Product} />
          <Route path="/shop" component={Shop} />
          <Route path="/search" component={Search} />
          <Route path="/categories/:id" component={Category} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

const mapStateToProps = (store) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(getProfile()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
