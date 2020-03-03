import axios from 'axios'
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_START,
  TOGGLE_LIKE,
} from '../actionType'

export const getProducts = (pageIndex = 1, searchText = '') => dispatch => {
  dispatch({ type: GET_PRODUCTS_START, pageIndex })
  return axios
    .get(`/products?pageIndex=${pageIndex}&searchText=${searchText}`)
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

export const toggleLike = (productId, userId) => dispatch => {
  return axios.post(`/products/${productId}/toggleLike`).then(response => {
    dispatch({
      type: TOGGLE_LIKE,
      payload: response,
      productId,
      userId,
    })
  })
}

export const getProduct = id => axios.get(`/products/${id}`)
