import axios from 'axios';
/**
 * Method that handles ajax calls and returns the response
 * or log the error data, status and headers
 *
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @returns {Object || null}
 */
const apiCall = async (method = 'get', url, data = {}) => {
    const api = axios.create({ baseURL: 'https://my-json-server.typicode.com/drakulovski/dbplaceholder' });

    try {
        const response = await api[method](url, data);
        if (response && response.data) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
};

/**
 * Method that gets the database values
 *
 * @returns {Object || null}
 */
export const getDatabase = async () => {
    const response = await apiCall('get', '/db');
    return response;
};

/**
 * Method that gets the products values
 * @param {String} url
 * @returns {Array || null}
 */
export const getProducts = async (url = '/products') => {
    const response = await apiCall('get', url);
    return response;
};

/**
 * Method that gets the states values
 *
 * @returns {Array || null}
 */
export const getStates = async () => {
    const response = await apiCall('get', '/states');
    return response;
};

/**
 * Method that gets the categories values
 *
 * @returns {Array || null}
 */
export const getCategories = async () => {
    const response = await apiCall('get', '/categories');
    return response;
};
