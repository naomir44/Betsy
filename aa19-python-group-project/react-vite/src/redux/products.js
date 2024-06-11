
const GET_ALL_PRODUCTS = '/products/GET_ALL_PRODUCTS'
const GET_PRODUCT_DETAILS = '/products/GET_PRODUCT_DETAILS'
const CREATE_PRODUCT = '/products/CREATE_PRODUCT'
const ADD_IMAGE = '/product/ADD_IMAGE'
const UPDATE_PRODUCT = '/product/UPDATE_PRODUCT'
const DELETE_PRODUCT = '/product/DELETE_PRODUCT'

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

const addImage = image => {
    return {
        type: ADD_IMAGE,
        image
    }
}

const updateProduct = product => {
    return {
        type: UPDATE_PRODUCT,
        product
    }
}

const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        productId
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
    if (res.ok) {
        const newProduct = await res.json()
        console.log(newProduct)
        dispatch(createProduct(newProduct))
        return newProduct
    } else {
        const errorData = await res.json()
        console.error('Error creating product:', errorData)
    }
}

export const fetchAddImage = (image) => async (dispatch) => {
    const res = await fetch('/api/products/new/image', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
    })
    if (res.ok) {
        const newImage = await res.json()
        console.log(newImage)
        dispatch(addImage(newImage))
        return newImage
    } else {
        const errorData = await res.json()
        console.error('Error creating image:', errorData)
    }
}

export const fetchUpdateProduct = (product, productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    if (res.ok) {
        const updatedProduct = await res.json()
        console.log(updatedProduct)
        dispatch(updateProduct(updatedProduct))
        return updatedProduct
    }
}

export const fetchDeleteProduct = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/delete`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteProduct(productId))
        return
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
        case ADD_IMAGE: {
            const newState = {
                ...state,
                [action.image.product_id]: {
                    ...state[action.image.product_id],
                    images: [
                        ...(state[action.image.product_id]?.images || []),
                        action.image
                    ]
                }
            }
            return newState
        }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                [action.product.id]: {...state[action.product]}
            }
        }
        case DELETE_PRODUCT: {
            const newState = { ...state };
            delete newState[action.productId];
            return newState;
        }
        default:
            return state
    }
}

export default productsReducer
