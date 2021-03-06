import {
    SET_IS_ADD_PRODUCT_MODAL_OPEN,
    SET_IS_SINGLE_PRODUCT_MODAL_OPEN,
    SET_SORT_BY_NAME,
    SET_SORT_BY_PRICE
} from '../actionsConsts';

export const setIsAddProductModalOpen = (booleanValue) => (dispatch) => {
    dispatch({
        type: SET_IS_ADD_PRODUCT_MODAL_OPEN,
        payload: booleanValue
    });
};

export const setIsSingleProductModalOpen = (booleanValue) => (dispatch) => {
    dispatch({
        type: SET_IS_SINGLE_PRODUCT_MODAL_OPEN,
        payload: booleanValue
    });
};

export const setSortByName = (value) => (dispatch) => {
    dispatch({
        type: SET_SORT_BY_NAME,
        payload: value
    });
};

export const setSortByPrice = (value) => (dispatch) => {
    dispatch({
        type: SET_SORT_BY_PRICE,
        payload: value
    });
};
