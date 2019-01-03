import axios from 'axios';
import * as auth from './auth';

const create = (baseURL = process.env.REACT_APP_API_URL) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  api.interceptors.request.use(
    config => {
      const token = auth.getToken();
      if (token) {
        config.headers.Authorization = `JWT ${token}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );

  const postLogin = loginObj => api.post('/login', loginObj);
  const getOrders = () => api.get('/orders');
  const getProducts = () => api.get('/products');
  const getProduct = id => api.get(`/products/${id}`);
  const patchProduct = (id, productObj) =>
    api.patch(`/products/${id}`, productObj);
  const deleteProduct = id => api.delete(`/products/${id}`);
  const postProduct = productObj => api.post('/products', productObj);
  const postProductImage = (id, imageObj) =>
    api.post(`/products/${id}/image`, imageObj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  const getCategories = () => api.get('/categories');
  const getCategory = id => api.get(`/categories/${id}`);
  const postCategory = categoryObj => api.post('/categories', categoryObj);
  const patchCategory = (id, categoryObj) =>
    api.patch(`/categories/${id}`, categoryObj);
  const deleteCategory = id => api.delete(`/categories/${id}`);

  return {
    postLogin,
    getOrders,
    getProduct,
    getProducts,
    deleteProduct,
    postProduct,
    patchProduct,
    postProductImage,
    getCategories,
    getCategory,
    postCategory,
    patchCategory,
    deleteCategory
  };
};

export default create;
