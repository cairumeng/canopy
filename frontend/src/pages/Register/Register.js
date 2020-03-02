import React, { useState } from 'react'
import defaultAvatar from './images/default-avatar.png'
import { uploadFile } from '../../redux/actions/helpers'
import { register, login } from '../../redux/actions/auth'
import './Register.css'

const Register = props => {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [isUploading, setUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState({})

  const onUploadFileHandler = e => {
    const file = e.target.files[0]
    setUploading(true)
    uploadFile(file)
      .then(response => {
        setAvatar(response.url)
        setUploading(false)
      })
      .catch(error => {
        setUploading(false)
      })
  }

  const onRegisterHandler = e => {
    e.preventDefault()
    e.stopPropagation()
    const isDefaultAvatar = avatar.search('data:image') >= 0
    register({
      name,
      nickname,
      email,
      password,
      avatar: isDefaultAvatar ? null : avatar,
    })
      .then(() => {
        login({ email, password }).then(token => {
          localStorage.setItem('CANOPY_TOKEN', token)
          props.history.push('/')
        })
      })
      .catch(error => {
        setErrorMessage(error.errors)
      })
  }

  return (
    <div className="register-form-container">
      <h2 className="regitser-form-title">Live beautifully</h2>

      <form className="col-lg-6 col-md-8 col-sm-12 register-form">
        <div className="form-group">
          <label>first and last name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errorMessage ? (
            <small className="form-text text-muted">{errorMessage.name}</small>
          ) : null}
        </div>

        <div className="form-group">
          <label>nickname</label>
          <input
            type="text"
            className="form-control"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          {errorMessage ? (
            <small className="form-text text-muted">
              {errorMessage.nickname}
            </small>
          ) : null}
        </div>

        <div className="form-group">
          <label>email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errorMessage ? (
            <small className="form-text text-muted">{errorMessage.email}</small>
          ) : null}
        </div>

        <div className="form-group">
          <label>password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errorMessage ? (
            <small className="form-text text-muted">
              {errorMessage.password}
            </small>
          ) : null}
        </div>
        <div className="form-group form-check">
          <input type="checkbox" className="form-check-input" />
          <label className="form-check-label">Remember me</label>
        </div>

        <div>
          <label
            for="upload-avatar"
            className="preview-avatar"
            disabled={isUploading}
          >
            <img src={avatar} className="register-avatar" alt="avatar" />
          </label>
          <div>
            <label for="upload-avatar" className="btn btn-danger btn-upload">
              <input
                id="upload-avatar"
                type="file"
                value=""
                onChange={onUploadFileHandler}
              />
              Upload
            </label>
          </div>
        </div>
      </form>
      <div className="mt-5">
        <button
          type="submit"
          className="btn btn-success btn-lg btn-block"
          onClick={onRegisterHandler}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Register
