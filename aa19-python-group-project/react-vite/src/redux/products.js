
const GET_ALL_PRODUCTS = '/products/GET_ALL_PRODUCTS'
const GET_PRODUCT_DETAILS = '/products/GET_PRODUCT_DETAILS'
const CREATE_PRODUCT = '/products/CREATE_PRODUCT'

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

const createProduct = product => {
    return {
        type: CREATE_PRODUCT,
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

export const fetchCreateProduct = (product) => async (dispatch) => {
    const res = await fetch('/api/products/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    console.log(res)
    if (res.ok) {
        const newProduct = await res.json()
        console.log(newProduct)
        dispatch(createProduct(newProduct))
        return newProduct
    }else {
        const errorData = await res.json()
        console.error('Error creating product:', errorData)
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
        case CREATE_PRODUCT: {
            const newState = {
                ...state,
                [action.product.id]: action.product
            }
            return newState
        }
        default:
            return state
    }
}

export default productsReducer
