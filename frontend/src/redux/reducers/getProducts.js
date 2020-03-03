import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_START,
  TOGGLE_LIKE,
} from '../actionType'

const initialState = {
  isLoading: false,
  products: [],
  lastPage: 1,
  pageIndex: 1,
  errors: {},
}

const getProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_START: {
      return {
        ...state,
        errors: {},
        isLoading: true,
        products: action.pageIndex === 1 ? [] : state.products,
      }
    }
    case GET_PRODUCTS_SUCCESS: {
      let products = action.payload.products
      if (action.payload.pageIndex > 1) {
        products = [...products, ...action.payload.products]
      }

      return {
        ...state,
        products,
        lastPage: action.payload.lastPage,
        pageIndex: action.payload.pageIndex,
        isLoading: false,
      }
    }
    case GET_PRODUCTS_FAILED: {
      return {
        ...state,
        errors: action.payload,
        isAuth: false,
        isLoading: false,
      }
    }
    case TOGGLE_LIKE: {
      if (action.payload) {
        return {
          ...state,
          products: state.products.map(product => {
            if (product.id === action.productId) {
              return {
                ...product,
                likedUsers: [...product.likedUsers, action.payload],
              }
            }
            return product
          }),
        }
      } else {
        return {
          ...state,
          products: state.products.map(product => {
            if (product.id === action.productId) {
              return {
                ...product,
                likedUsers: product.likedUsers.filter(
                  user => user.id !== action.userId
                ),
              }
            }
            return product
          }),
        }
      }
    }
    default:
      return state
  }
}

export default getProductsReducer
