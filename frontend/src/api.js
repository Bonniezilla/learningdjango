import axios from 'axios';

const api = axios.create({
    baseURL:  import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createProduct = async (product) => {
    const response = await api.post('/products/', product);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}/`);
    return response.data;
}

export const getProductByName = async (name) => {
    const response = await api.get(`/products/?search=${encodeURIComponent(name)}`);
    return response.data;
}

export default api;