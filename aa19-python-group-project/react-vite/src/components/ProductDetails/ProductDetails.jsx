import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetails } from "../../redux/products"
import { useParams } from "react-router-dom"


const ProductDetails = () => {
    let { productId } = useParams()
    productId = +productId
    const dispatch = useDispatch()
    const product = useSelector((state) => state.products[productId])

    useEffect(() => {
        dispatch(fetchProductDetails(productId))
    }, [dispatch, productId])

    if (!product) return <div>Loading...</div>
return (
    <>
    <h1>Product Details</h1>
    <div>{product.name}</div>
    <div>{product.description}</div>
    <div>{product.price}</div>
    </>
)
}

export default ProductDetails
