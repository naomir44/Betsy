
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { fetchProducts } from "../../redux/products"
import DeleteProduct from "../DeleteProduct"
import OpenModalButton from "../OpenModalButton"
import './UserProducts.css'

const UserProducts = () => {
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => Object.values(state.products).filter(product => product.user_id === user.id))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <div className="user-product-container">
          {products.map(product => (
            <div key={product.id} className="user-product-card">
                 <h2 className="user-product-name">{product.name}</h2>
              <NavLink to={`/products/${product.id}`}>
                <img className="user-product-image" src={product.images[0]?.url} alt={product.name}></img>
              </NavLink>
              <NavLink to={`/products/${product.id}/edit`}>
                <button className="update-product-user">Update Product</button>
              </NavLink>
              <OpenModalButton
                modalComponent={<DeleteProduct productId={product.id} />}
                buttonText='Delete'
              />
            </div>
          ))}
        </div>
      );
}

export default UserProducts
