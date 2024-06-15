import { useDispatch, useSelector } from "react-redux"
import { fetchPurchaseCart, fetchDeleteCart } from "../../redux/cart-items"
import { useModal } from "../../context/Modal"

const Checkout = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const cartItems = useSelector((state) => Object.values(state.cartItems).filter(items => items.user_id === user.id))
    let total = 0
    cartItems.forEach(item => total += item.quantity)

    const handlePurchase = async () => {
        await dispatch(fetchPurchaseCart(user.id));
        closeModal()
        alert("Thank you for your purchase!")
    }

    return (
        <div className="checkout-modal">
            <div className="checkout-content">
                <h1>Confirm your purchase of {total} items</h1>
                <div className="checkout-actions">
                    <button className="checkout-button" onClick={handlePurchase}>Purchase</button>
                    <button className="checkout-button cancel-button" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Checkout
