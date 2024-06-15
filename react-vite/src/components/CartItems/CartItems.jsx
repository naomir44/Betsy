import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCartItems, fetchDeleteCart, fetchEditCart, updateLocalCartItems } from "../../redux/cart-items"
import { NavLink } from "react-router-dom"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import Checkout from "./Checkout"

const CartItems = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const cartItems = useSelector((state) => Object.values(state.cartItems).filter(items => items.user_id === user.id))
    const [editingItemId, setEditingItemId] = useState(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        dispatch(fetchCartItems())
    }, [dispatch])

    const handleDelete = (productId) => {
        dispatch(fetchDeleteCart(productId))
    }

    const handleEditQuantity = (item) => {
        setEditingItemId(item.id);
        setQuantity(item.quantity);
    }

    const handleSaveQuantity = async (productId) => {
        const payload = { quantity: quantity };
        const response = await dispatch(fetchEditCart(productId, payload));
        if (response.error) {
            console.error("Failed to update quantity:", response.error);
        } else {
            setEditingItemId(null);
            const updatedCartItems = cartItems.map(item =>
                item.id === productId ? { ...item, quantity: quantity } : item
            );
            dispatch(updateLocalCartItems(updatedCartItems))
        }
    }

    if (!cartItems) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <h1>Sign in to add items to your cart!</h1>
    }

    if (cartItems.length === 0) {
        return (
            <>
            <h1>Your cart is empty</h1>
            <NavLink to={'/'}>Discover something unique to fill it up</NavLink>
            <NavLink to={'/favorites'}><button>Your Favorites</button></NavLink>
            </>
        )
    }

    return (
        <>
        <h1>Cart Items</h1>
        {cartItems.map(item => (
            <h2 key={item.products.name} className="cart-item-card">
                <img className="cart-item-image" src={item.products.images[0].url}></img>
                <div className="cart-item-name">{item.products.name}</div>
                <div className="cart-item-quantity">
                        {editingItemId === item.id ? (
                            <>
                                <input
                                    type="number"
                                    value={quantity}
                                    min="1"
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                />
                                <button onClick={() => handleSaveQuantity(item.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>Quantity: {item.quantity}</span>
                                <button onClick={() => handleEditQuantity(item)}>Edit Quantity</button>
                            </>
                        )}
                    </div>
                <button onClick={() => handleDelete(item.id)}>Remove Item</button>
            </h2>
        ))}
        <OpenModalButton
        modalComponent={<Checkout />}
        buttonText='Checkout'
        />
        </>
    )
}

export default CartItems;
