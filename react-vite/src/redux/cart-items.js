const GET_CART_ITEMS = '/cartItems/GET_CART_ITEMS'
const ADD_CART_ITEM = '/cartItems/ADD_CART_ITEM'
const DELETE_CART = '/cartItems/DELETE_CART'
const EDIT_CART = '/cartItems/EDIT_CART'
const UPDATE_LOCAL_CART_ITEMS = '/cartItems/UPDATE_LOCAL_CART_ITEMS'
const PURCHASE = '/cartItems/PURCHASE'

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

const deleteCart = (itemId) => {
    return {
        type: DELETE_CART,
        itemId
    }
}

const editCart = (item) => {
    return {
        type: EDIT_CART,
        item
    }
}

export const updateLocalCartItems = (cartItems) => {
    return {
        type: UPDATE_LOCAL_CART_ITEMS,
        cartItems
    };
}

const purchaseCart = () => {
    return {
        type: PURCHASE
    }
}

export const fetchCartItems = () => async (dispatch) => {
    const res = await fetch('/api/cart/')

    if (res.ok) {
        const cartItems = await res.json()
        dispatch(getCartItems(cartItems))
        return cartItems
    }
}

export const fetchAddCartItem = (cartItem) => async (dispatch) => {
    const res = await fetch('/api/cart/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
    })

    if (res.ok) {
        const addedItem = await res.json()
        dispatch(addCartItem(addedItem))
        dispatch(fetchCartItems())
        return addedItem
    }
}

export const fetchDeleteCart = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/cart/${itemId}/`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const deletedItem = await res.json()
        dispatch(deleteCart(deletedItem))
        dispatch(fetchCartItems())
        return deletedItem
    }
}

export const fetchEditCart = (itemId, payload) => async (dispatch) => {
    const res = await fetch(`/api/cart/${itemId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (res.ok) {
        const updatedItem = await res.json()
        dispatch(editCart(updatedItem))
        dispatch(fetchCartItems())
        return updatedItem
    }
}

export const fetchPurchaseCart = (userId) => async (dispatch) => {
    const res = await fetch(`/api/cart/purchase/${userId}/`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const purchase = await res.json()
        dispatch(purchaseCart())
        return purchase
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
        case DELETE_CART: {
            const newState = { ...state };
            delete newState[action.itemId];
            return newState;
        }
        case EDIT_CART: {
            return {
                ...state,
                [action.item.id]: action.item,
            };
        }
        case UPDATE_LOCAL_CART_ITEMS: {
            const cartState = {};
            action.cartItems.forEach(cartItem => (cartState[cartItem.id] = cartItem));
            return cartState;
        }
        case PURCHASE: {
            return {}
        }
        default:
            return state
    }
}

export default cartReducer
