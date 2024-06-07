


const GET_ALL_PRODUCTS = '/products/GET_ALL_PRODUCTS'
const GET_PRODUCT_DETAILS = '/products/GET_PRODUCT_DETAILS'

const getAllProducts = products => {
    return {
        type: GET_ALL_PRODUCTS,
        products
    }
}

const getProductDetails = product => {
    return {
        type: GET_PRODUCT_DETAILS,
        product
    }
}

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch('/api/products')

    if (res.ok) {
        const products = await res.json()
        dispatch(getAllProducts(products))
        return products
    }
}

export const fetchProductDetails = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`)

    if (res.ok) {
        const product = await res.json()
        dispatch(getProductDetails(product))
        return product
    }
}

const initialState = {}
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS: {
            const productsState = { ...state }
            action.products.forEach(product => (productsState[product.id] = product))
            return productsState
        }
        case GET_PRODUCT_DETAILS: {
            return {
                ...state,
                [action.product.id]: action.product
            }
        }
        default:
            return state
    }
}

export default productsReducer
