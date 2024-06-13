const GET_CART_ITEMS = '/cartItems/GET_CART_ITEMS'
const ADD_CART_ITEM = '/cartItems/ADD_CART_ITEM'

const getCartItems = (cartItems) => {
    return {
        type: GET_CART_ITEMS,
        cartItems
    }
}

const addCartItem = (cartItem) => {
    return {
        type: ADD_CART_ITEM,
        cartItem
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

export const fetchAddCartItem = (cartItem) => async (dispatch) => {
    const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
    })

    if (res.ok) {
        const addedItem = res.json()
        dispatch(addCartItem(addedItem))
        return addedItem
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
        case ADD_CART_ITEM: {
            return {
                ...state,
                [action.cartItem.id]: action.cartItem
            }
        }
        default:
            return state
    }
}

export default cartReducer
