import { SET_IS_ADD_PRODUCT_MODAL_OPEN, SET_SORT_BY_NAME, SET_SORT_BY_PRICE } from '../actionsConsts';

const initialState = {
    isAddProductModalOpen: false,
    sortByState: null,
    sortByPrice: null
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_IS_ADD_PRODUCT_MODAL_OPEN:
            return {
                ...state,
                isAddProductModalOpen: payload
            };
        case SET_SORT_BY_NAME:
            return {
                ...state,
                sortByState: payload
            };
        case SET_SORT_BY_PRICE:
            return {
                ...state,
                sortByPrice: payload
            };

        default:
            return state;
    }
};

export default reducer;
