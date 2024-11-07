import { apiRequest } from "../../../helpers/RequestHelper";


const productsApiUrl = process.env.REACT_APP_API_URL_PRODUCTS;

export const fetchProducts = async (token) => {
    return await apiRequest('get', productsApiUrl, token);
};

export const fetchProduct = async (id, token) => {
    return await apiRequest('get', `${productsApiUrl}/${id}`, token);
};

export const updateProductApproval = async (id, token, status = true) => {
    return await apiRequest('patch', `${productsApiUrl}/${id}`, token, { approved: status });
};
