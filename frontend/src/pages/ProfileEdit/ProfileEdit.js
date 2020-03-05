import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { uploadFile } from '../../redux/actions/helpers'
import { changeInfo, getProfile } from '../../redux/actions/user'

const ProfileEdit = props => {
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState({})

  useEffect(() => {
    props.getProfile().then(user => {
      setName(user.name)
      setNickname(user.nickname)
      setEmail(user.email)
      setAvatar(user.avatar)
      setDescription(user.description)
    })
  }, [])

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

  const onProfileEditHandler = e => {
    e.preventDefault()
    e.stopPropagation()
    const isDefaultAvatar = avatar.search('data:image') >= 0

    changeInfo({
      name,
      nickname,
      email,
      password,
      description,
      avatar: isDefaultAvatar ? null : avatar,
    })
      .then(() => {
        props.history.push('/profile')
      })
      .catch(error => {
        setErrorMessage(error.errors)
      })
  }
  return (
    <div className="register-form-container">
      <h2 className="regitser-form-title">Edit your account</h2>

      <form className="col-lg-6 col-md-8 col-sm-12 register-form">
        <div>
          <label for="upload-avatar" className="preview-avatar">
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
        <div className="form-group">
          <label>full name</label>
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
            disabled
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errorMessage ? (
            <small className="form-text text-muted">{errorMessage.email}</small>
          ) : null}
        </div>

        <div className="form-group">
          <label>new password</label>
          <input
            type="password"
            className="form-control"
            onChange={e => setPassword(e.target.value)}
          />
          {errorMessage ? (
            <small className="form-text text-muted">
              {errorMessage.password}
            </small>
          ) : null}
        </div>

        <div className="form-group">
          <label>description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </form>

      <div className="mt-5">
        <button
          type="submit"
          className="btn btn-success btn-lg btn-block"
          onClick={onProfileEditHandler}
        >
          Save account
        </button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
