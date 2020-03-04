import React from 'react'
import Category from '../../components/Category/Category'
const CategoryList = ({ categories }) => {
  return (
    <div className="row">
      {categories.map(category => (
        <Category category={category} key={category.id} />
      ))}
    </div>
  )
}
export default CategoryList
