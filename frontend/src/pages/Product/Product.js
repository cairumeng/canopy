import React, { useState, useEffect } from 'react'
import { getProduct } from '../../redux/actions/product'
import { connect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import './Product.scss'

const Product = ({ match, profileState }) => {
  const [product, setProduct] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    getProduct(match.params.id).then(product => {
      setProduct(product)
      setPreviewImage(product.images[0])
      setLoading(false)
    })
  }, [])

  if (isLoading) {
    return <Loading />
  }

  const isLikedByMe = product.likedUsers?.find(
    user => user.id === profileState.user?.id
  )

  return (
    <div className="container product-detail">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-xs-12">
          <img className="product-preview" src={previewImage} />
          <div className="mt-3 product-images">
            {product.images.map((productImage, i) => (
              <img
                src={productImage}
                key={i}
                className="avatar"
                onMouseEnter={() => setPreviewImage(productImage)}
              />
            ))}
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-xs-12">
          <h1>{product.name}</h1>
          <div className="mt-4">
            <span>By</span>
            <span className="brand"> {product.brand}</span>
          </div>
          <button className="price-button mt-4">
            ${product.price} on Amazon Prime
          </button>
          <div className="mt-3">
            {product.likedUsers.map(user => (
              <img src={user.avatar} key={user.id} className="avatar" />
            ))}
          </div>
          <div className="mt-5">
            <span>Founded by </span>
            <span className="brand">{product.owner.nickname}</span>
          </div>
          <div className="mt-3">
            <a className="icon-heart">
              <i
                className={
                  'fa fa-heart ' + (isLikedByMe ? 'icon-heart-red' : '')
                }
              />
              <span>LIKE</span>
            </a>
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
