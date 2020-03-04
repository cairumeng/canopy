import axios from 'axios'
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_START,
} from '../actionType'

export const getCategories = () => axios.get(`/categories`)

export const getCategoryProducts = (id, pageIndex = 1) => {
  return dispatch => {
    dispatch({ type: GET_PRODUCTS_START, pageIndex })
    return axios
      .get(`/categories/${id}?pageIndex=${pageIndex}`)
      .then(response => {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: response,
        })
        return response
      })
      .catch(response => {
        dispatch({
          type: GET_PRODUCTS_FAILED,
          payload: response.errors,
        })
      })
  }
}
