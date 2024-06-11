import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const UserProducts = () => {
    const user = useSelector(state => state.session.user)
    const products = useSelector(state => Object.values(state.products))
    console.log(products)
    return (
        <>
        {products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name}></img>
                <h2>{product.name}</h2>
            </Link>
        ))}
        </>
    )
}

export default UserProducts
