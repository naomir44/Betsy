const GET_CART_ITEMS = '/cartItems/GET_CART_ITEMS'

const getCartItems = (cartItems) => {
    return {
        type: GET_CART_ITEMS,
        cartItems
    }
}

export const fetchCartItems = () => async (dispatch) => {
    const res = await fetch('/api/cart')

    if (res.ok) {
        const cartItems = await res.json()
        dispatch(getCartItems(cartItems))
        return cartItems
    }
}

const initialState = {}
const cartReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_CART_ITEMS: {
            const cartState = { ...initialState }
            action.cartItems.forEach(cartItem => (cartState[cartItem.id] = cartItem));
            return cartState
        }
        default:
            return state
    }
}

export default cartReducer
