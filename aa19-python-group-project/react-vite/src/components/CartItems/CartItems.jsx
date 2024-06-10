import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCartItems } from "../../redux/cart-items"

const CartItems = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => Object.values(state.cartItems))

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch])

    if (!cartItems) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <h1>Cart Items</h1>
        {cartItems.map(item => (
            <h2 key={item.products.name}>
                {item.products.name}
            </h2>
        ))}
        </>
    )
}

export default CartItems;
