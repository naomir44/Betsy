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
        <>
        <h1>Confirm your purchase of {total} items</h1>
        <button onClick={handlePurchase}>Purchase</button>
        <button onClick={closeModal}>Cancel</button>
        </>
    )
}

export default Checkout
