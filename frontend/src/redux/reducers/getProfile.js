import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILED,
  GET_PROFILE_START,
} from '../actionType'

const initialState = {
  isLoading: false,
  user: {},
  isAuth: false,
  errors: {},
}

const getProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_START: {
      return {
        ...state,
        errors: {},
        isLoading: true,
      }
    }
    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
      }
    }
    case GET_PROFILE_FAILED: {
      return {
        ...state,
        errors: action.payload,
        isAuth: false,
        isLoading: false,
      }
    }
    default:
      return state
  }
}

export default getProfileReducer
