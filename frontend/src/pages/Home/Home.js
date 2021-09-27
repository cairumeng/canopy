import React from 'react'
import { connect } from 'react-redux'
import ProductList from '../../components/ProductList/ProductList'
import Loading from '../../components/Loading/Loading'
import { getProducts } from '../../redux/actions/product'
import './Home.scss'

class Home extends React.Component {
  scrollFunc = null

  state = {
    isAutoLoading: false,
  }

  handleScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight
    const html = document.documentElement
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    const windowBottom = windowHeight + window.pageYOffset

    const { lastPage, pageIndex, isLoading } = this.props.productsState

    if (
      windowBottom + 200 >= docHeight &&
      !isLoading &&
      pageIndex <= lastPage
    ) {
      this.setState({
        isLoading: true,
      })
      this.props.getProducts(pageIndex + 1)
    }
  }

  onLoadMoreHandler = () => {
    this.setState({
      isAutoLoading: true,
    })
    this.scrollFunc = window.addEventListener('scroll', this.handleScroll, true)

    this.props.getProducts(this.props.productsState.pageIndex + 1)
  }
  componentDidMount() {
    this.id = this.props.match.params.id
    this.setState({
      isLoading: true,
    })
    this.props.getProducts().then((response) => {
      this.setState({
        categoryName: response?.categoryName,
      })
    })
  }

  componentWillUnmount() {
    // all addEventListenr & setInterval operation should be free
    window.removeEventListener('scroll', this.scrollFunc)
  }

  render() {
    const { products, lastPage, pageIndex, isLoading } =
      this.props.productsState

    return (
      <>
        <div className="container mt-5">
          <ProductList products={products} />
        </div>

        {isLoading && <Loading />}

        {!this.state.isAutoLoading && !isLoading && (
          <div className="LoadMoreButton" onClick={this.onLoadMoreHandler}>
            Load more
          </div>
        )}

        {!isLoading && pageIndex >= lastPage && <div>No more products</div>}
      </>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    productsState: store.getProducts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (pageIndex) => dispatch(getProducts(pageIndex)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
