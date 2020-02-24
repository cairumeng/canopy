import { combineReducers } from 'redux'
import getProfile from '../reducers/getProfile'
import getProducts from '../reducers/getProducts'
const reducers = combineReducers({ getProfile, getProducts })
export default reducers
