import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCartItems, fetchDeleteCart, fetchEditCart, updateLocalCartItems } from "../../redux/cart-items"
import { NavLink } from "react-router-dom"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import Checkout from "./Checkout"
import './CartItems.css'

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

    if (!user) {
        return <h1 className="empty-cart-signin">Sign in to add items to your cart!</h1>
    }

    if (!cartItems) {
        return <div>Loading...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart">
                <h1 className="empty-cart-title">Your cart is empty</h1>
                <div><NavLink to={'/'}>Discover something unique to fill it up</NavLink></div>
                <div><NavLink to={'/favorites'}>Your Favorites</NavLink></div>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <h1>Cart Items</h1>
            {cartItems.map(item => (
                <div key={item.products.name} className="cart-item-card">
                    <img className="cart-item-image" src={item.products.images[0].url} alt={item.products.name} />
                    <div className="cart-item-details">
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
                    </div>
                    <button className="cart-item-remove" onClick={() => handleDelete(item.id)}>Remove Item</button>
                </div>
            ))}
            <OpenModalButton
                modalComponent={<Checkout />}
                buttonText='Checkout'
                className="checkout-button"
            />
        </div>
    )
}

export default CartItems;
