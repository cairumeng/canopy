import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/actions/user'
import { login } from '../../redux/actions/auth'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState({})

  const onLoginHandler = e => {
    e.preventDefault()
    e.stopPropagation()
    login({ email, password })
      .then(() => {
        props.getProfile()
        props.history.push('/')
      })
      .catch(error => {
        setErrorMessage(error.errors)
      })
  }
  return (
    <div className="register-form-container">
      <h2 className="regitser-form-title">Welcome back</h2>
      <form className="col-lg-6 col-md-8 col-sm-12 register-form">
        <div className="form-group mb-5">
          <input
            type="text"
            className="form-control "
            placeholder="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
          />
          {errorMessage ? (
            <small className="form-text text-muted">{errorMessage.email}</small>
          ) : null}
        </div>

        <div className="form-group mb-5">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          {errorMessage ? (
            <small className="form-text text-muted">
              {errorMessage.password}
            </small>
          ) : null}
        </div>
        <div className="form-group  mb-5">
          <button
            type="submit"
            className="btn btn-success btn-block"
            onClick={onLoginHandler}
          >
            Login
          </button>
        </div>
        <hr />
        <div className="pt-3 pb-5">
          <Link to="/register" className="text-button">
            I need an account
          </Link>
        </div>
      </form>
    </div>
  )
}
const mapStateToProps = store => {
  return {
    profileState: store.getProfile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getProfile()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
