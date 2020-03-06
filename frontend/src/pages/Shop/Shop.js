import React, { useEffect, useState } from 'react'
import CategoryList from '../../components/CategoryList/CategoryList'
import { getCategories } from '../../redux/actions/category'

const Shop = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    getCategories().then(response => {
      setCategories(response.categories)
    })
  }, [])

  return (
    <div className="container mt-5 mb-5">
      <CategoryList categories={categories} />
    </div>
  )
}

export default Shop
