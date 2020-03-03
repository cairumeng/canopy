import React from 'react'
import { connect } from 'react-redux'
import { toggleLike } from '../../redux/actions/product'
import './ProductItem.scss'
import { withRouter } from 'react-router-dom'

const ProductItem = ({ product, profileState, history, toggleLike }) => {
  const isLikedByMe = product.likedUsers?.some(
    user => user.id === profileState.user?.id
  )

  const handleToggleLike = e => {
    e.stopPropagation()
    toggleLike(product.id, profileState.user.id)
  }

  return (
    <div className="col-md-4 col-sm-6 col-lg-4 mb-5">
      <div
        className="product-card"
        onClick={() => history.push(`/products/${product.id}`)}
      >
        <div className="product-card-header">
          <div className="card-buy-button">
            <span className="price">${parseInt(product.price)}</span>
          </div>
        </div>
        <div className="product-card-body">
          <div className="product-card-image">
            <img src={product.images[0]} />
          </div>
        </div>

        <div className="product-card-details">
          <div className="product-details-name">
            <span className="text-underline">{product.name}</span>
          </div>
          <div className="product-details-brand">
            <span>
              <span>by </span>
              {product.brand}
            </span>
          </div>
        </div>
        <div className="product-card-footer">
          <div className="feed-card-footer">
            <div className="footer-left-side most-popular-content">
              {product.likedUsers?.map(user => (
                <a href="" className="card-footer-avatar" key={user.id}>
                  <div
                    className="card-avatar"
                    style={{
                      backgroundImage: `url(${user.avatar})`,
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="user-actions" onClick={handleToggleLike}>
            <div className="like-action">
              <div className="like-action-inner">
                <a className="like-action-link">
                  <i
                    className={
                      'like-action-icon fa fa-heart ' +
                      (isLikedByMe ? 'icon-heart-red' : '')
                    }
                  />
                  <span className="like-action-number">
                    {product.likedUsers?.length}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
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
    toggleLike: (productId, userId) => dispatch(toggleLike(productId, userId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductItem))
