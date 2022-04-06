import {
    FETCH_CATEGORIES,
    FETCH_DATABASE,
    FETCH_STATES,
    SET_PRODUCTS,
    ADD_PRODUCT,
    SET_SELECTED_PRODUCT
} from '../actionsConsts';

const initialState = {
    products: [],
    categories: [],
    states: [],
    selectedProduct: {}
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_DATABASE:
            return {
                ...state,
                products: payload.products,
                categories: payload.categories,
                states: payload.states
            };
        case FETCH_STATES:
            return {
                ...state,
                states: payload
            };
        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: payload
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: payload
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, payload]
            };
        case SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: payload
            };

        default:
            return state;
    }
};

export default reducer;
