import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/actions/user'
import './Profile.css'

const Profile = (props) => {
  const { name, avatar, nickname, description } = props.profileState.user

  useEffect(() => {
    props.getProfile()
  }, [props])

  return (
    <div className=" container-fluide user-header">
      <img src={avatar} className="user-avatar" alt="user-avatar" />
      <br />
      <div className="user-name">{name}</div>
      <div className="user-nickname">{nickname}</div>
      <div className="mt-3">{description}</div>
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    profileState: store.getProfile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => dispatch(getProfile()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
