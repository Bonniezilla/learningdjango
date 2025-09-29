import api from '../api';

export async function getProducts(filters = {}, url = "/products/") {
    const params = {};
    Object.keys(filters).forEach((key) => {
        if (filters[key] !== "" && filters[key] !== null && filters[key] !== undefined) {
            params[key] = filters[key];
        }
    });
    return api.get(url, { params });
}