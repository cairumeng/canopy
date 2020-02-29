import React, { useState } from 'react'
import { NavDropdown, NavLink } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { logout } from '../../redux/actions/auth'
import './Header.css'

const Header = props => {
  const [searchText, setSearchText] = useState('')
  const { name, avatar } = props.profileState.user
  const { isAuth } = props.profileState
  const logoutHandler = () => {
    logout()
    window.location.reload()
  }

  const onSearchHandler = e => {
    setSearchText(e.target.value)
  }

  const onSubmitHandler = e => {
    e.preventDefault()

    props.history.push(`/search?searchText=${searchText}`)
  }

  const header = isAuth ? (
    <NavDropdown
      title={<img src={avatar} alt="user pic" className="header-avatar" />}
    >
      <LinkContainer to="/profile" exact>
        <NavLink className="dropdown-item">
          {name}
          <br />
          View Profile
        </NavLink>
      </LinkContainer>
      <NavDropdown.Divider />

      <LinkContainer to="/profile/edit" exact>
        <NavLink className="dropdown-item">Edit Profile</NavLink>
      </LinkContainer>
      <NavDropdown.Divider />
      <NavLink className="dropdown-item" onClick={logoutHandler}>
        Logout
      </NavLink>
    </NavDropdown>
  ) : (
    <>
      <LinkContainer to="/login" exact>
        <NavLink className="button-login">Login</NavLink>
      </LinkContainer>
      <LinkContainer to="/register" exact>
        <NavLink className=" button-register">Register</NavLink>
      </LinkContainer>
    </>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <LinkContainer to="/" exact>
              <NavLink className="nav-link header-nav-link">
                <i className="fa fa-home" />
                Home
              </NavLink>
            </LinkContainer>
          </li>
          <li className="nav-item active">
            <LinkContainer to="/shop" exact>
              <NavLink className="nav-link header-nav-link">
                <i className="fa fa-shopping-cart" />
                Shop
              </NavLink>
            </LinkContainer>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 " onSubmit={onSubmitHandler}>
          <input
            className="form-control mr-sm-2 search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onKeyPress={onSearchHandler}
          />
        </form>
        {header}
      </div>
    </nav>
  )
}

const mapStateToProps = store => {
  return {
    profileState: store.getProfile,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
