import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from "../../redux/products"

const HomePage = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => Object.values(state.products))

  useEffect(() => {
      dispatch(fetchProducts())
  }, [dispatch])

return (
  <>
  <h1>Products</h1>
  {products.map(product => (
    <div key={product.name}>
      {product.name}
    </div>
  ))}
  </>
)
}

export default HomePage;
