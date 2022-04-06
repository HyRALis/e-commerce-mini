import { getDatabase, getProducts, getStates, getCategories, postProduct } from '../../Utils/ajaxRequests';
import { ADD_PRODUCT, FETCH_CATEGORIES, FETCH_DATABASE, FETCH_STATES, SET_PRODUCTS } from '../actionsConsts';

export const fetchDatabase = () => async (dispatch) => {
    const database = await getDatabase();

    await dispatch({
        type: FETCH_DATABASE,
        payload: database
    });
};

export const fetchProducts = () => async (dispatch) => {
    const products = await getProducts();

    await dispatch({
        type: SET_PRODUCTS,
        payload: products
    });
};

export const fetchStates = () => async (dispatch) => {
    const states = await getStates();

    await dispatch({
        type: FETCH_STATES,
        payload: states
    });
};

export const fetchCategories = () => async (dispatch) => {
    const categories = await getCategories();

    await dispatch({
        type: FETCH_CATEGORIES,
        payload: categories
    });
};

export const addProduct = (newProduct) => async (dispatch) => {
    const data = await postProduct(newProduct);

    await dispatch({
        type: ADD_PRODUCT,
        payload: data
    });
};
