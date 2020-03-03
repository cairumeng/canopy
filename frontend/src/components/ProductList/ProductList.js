import React from 'react'
import ProductItem from '../ProductItem/ProductItem'

const ProductList = ({ products }) => (
  <div className="row">
    {products.map(product => (
      <ProductItem key={product.id} product={product} />
    ))}
  </div>
)

export default ProductList
