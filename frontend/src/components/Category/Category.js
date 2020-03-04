import React from 'react'
import { withRouter } from 'react-router-dom'
import './Category.scss'

const Category = ({ category, history }) => {
  return (
    <div
      className="category-collection col-lg-3 col-md-3 col-xs-4"
      onClick={() => history.push(`/categories/${category.id}`)}
    >
      <div
        style={{ backgroundImage: `url(${category.avatar})` }}
        className="category-avatar"
      />
      <div className="category-name">{category.name}</div>
    </div>
  )
}
export default withRouter(Category)
