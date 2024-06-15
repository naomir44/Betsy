const GET_FAVORITES = '/favorites/GET_FAVORITES';
const ADD_FAVORITE = '/favorites/ADD_FAVORITE';
const REMOVE_FAVORITE = '/favorites/REMOVE_FAVORITE';

const getFavorites = (favorites) => {
  return {
    type: GET_FAVORITES,
    favorites
  };
};

const addFavorite = (favorite) => {
  return {
    type: ADD_FAVORITE,
    favorite
  };
};

const removeFavorite = (favoriteId) => {
  return {
    type: REMOVE_FAVORITE,
    favoriteId
  };
};

export const fetchFavorites = () => async (dispatch) => {
  const res = await fetch(`/api/favorites/`);

  if (res.ok) {
    const favorites = await res.json();
    dispatch(getFavorites(favorites));
    return favorites;
  }
};

export const fetchAddFavorite = (productId) => async (dispatch) => {
  const res = await fetch(`/api/favorites/new/${productId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    const favorite = await res.json();
    dispatch(addFavorite(favorite));
    return favorite;
  }
};

export const fetchRemoveFavorite = (productId) => async (dispatch) => {
  const res = await fetch(`/api/favorites/${productId}/`, {
    method: 'DELETE',
  });

  if (res.ok) {
    dispatch(removeFavorite(productId));
    return productId;
  }
};

const initialState = { items: [] };

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES: {
      return { ...state, items: action.favorites };
    }
    case ADD_FAVORITE: {
      return { ...state, items: [...state.items, action.favorite] };
    }
    case REMOVE_FAVORITE: {
      return { ...state, items: state.items.filter(item => item.id !== action.favoriteId) };
    }
    default:
      return state;
  }
};

export default favoritesReducer;
