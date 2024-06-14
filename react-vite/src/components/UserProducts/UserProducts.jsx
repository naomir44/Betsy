
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { fetchProducts } from "../../redux/products"
import DeleteProduct from "../DeleteProduct"
import OpenModalButton from "../OpenModalButton"


const UserProducts = () => {
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => Object.values(state.products).filter(product => product.user_id === user.id))
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <>
        {products.map(product => (
            <div key={product.name} className="product-card">
            <NavLink to={`/products/${product.id}`} key={product.id}>
                <img src={product.images[0]?.url} alt={product.name}></img>
                <h2>{product.name}</h2>
            </NavLink>
            <NavLink to={`/products/${product.id}/edit`}>
            <button>Update Product</button>
            </NavLink>
            <OpenModalButton
            modalComponent={<DeleteProduct productId={product.id}/>}
            buttonText='Delete'
            />
            </div>
        ))}
        </>
    )
}

export default UserProducts
