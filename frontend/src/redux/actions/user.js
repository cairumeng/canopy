import axios from 'axios'
import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  GET_PROFILE_START,
} from '../actionType'

export const getProfile = () => {
  return dispatch => {
    dispatch({ type: GET_PROFILE_START })
    return axios
      .get('/user/profile')
      .then(response => {
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: response,
        })
        return response
      })
      .catch(response => {
        dispatch({
          type: GET_PROFILE_FAILED,
          payload: response.errors,
        })
      })
  }
}

export const changeInfo = userInfo => axios.patch('/user/changeInfo', userInfo)
