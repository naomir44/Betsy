const GET_REVIEWS = '/reviews/GET_REVIEWS';
const ADD_REVIEW = '/reviews/ADD_REVIEW';
const UPDATE_REVIEW = '/reviews/UPDATE_REVIEW';
const DELETE_REVIEW = '/reviews/DELETE_REVIEW';

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
};

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    };
};

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    };
};

export const fetchReviews = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`);

    if (res.ok) {
        const reviews = await res.json();
        dispatch(getReviews(reviews));
        return reviews;
    }
};

export const createReview = (productId, reviewData) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(addReview(review));
        return review;
    }
};

export const editReview = (reviewId, reviewData) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(updateReview(review));
        return review;
    }
};

export const removeReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(deleteReview(reviewId));
        return reviewId;
    }
};

const initialState = {};
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = {};
            action.reviews.forEach(review => (newState[review.id] = review));
            return newState;
        }
        case ADD_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review
            };
        }
        case UPDATE_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review
            };
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewsReducer;
