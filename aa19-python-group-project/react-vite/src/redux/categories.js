const GET_ALL_CATEGORIES = '/categories/GET_ALL_CATEGORIES';
const GET_CATEGORY_DETAILS = '/categories/GET_CATEGORY_DETAILS';

const getAllCategories = categories => {
    return {
        type: GET_ALL_CATEGORIES,
        categories
    };
};

const getCategoryDetails = category => {
    return {
        type: GET_CATEGORY_DETAILS,
        category
    };
};

export const fetchCategories = () => async (dispatch) => {
    const res = await fetch('/api/categories');

    if (res.ok) {
        const categories = await res.json();
        dispatch(getAllCategories(categories));
        return categories;
    }
};

export const fetchCategoryDetails = (categoryId) => async (dispatch) => {
    const res = await fetch(`/api/categories/${categoryId}`);

    if (res.ok) {
        const category = await res.json();
        dispatch(getCategoryDetails(category));
        return category;
    }
};

const initialState = {};
const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CATEGORIES: {
            const categoriesState = { ...state };
            action.categories.forEach(category => (categoriesState[category.id] = category));
            return categoriesState;
        }
        case GET_CATEGORY_DETAILS: {
            return {
                ...state,
                [action.category.id]: action.category
            };
        }
        default:
            return state;
    }
};

export default categoriesReducer;
