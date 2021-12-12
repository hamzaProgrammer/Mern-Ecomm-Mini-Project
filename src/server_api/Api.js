const axios = require('axios');

const API = axios.create({
    baseURL: 'http://localhost:5000'
});

// this is for using local storage in headers, otherwise it will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;

});

// products routes
const getAllProducts = (data) => API.get(`/products/`);
const getSingleProd = (id) => API.get(`/products/getSingleProduct/${id}`);
const addProduct = (data) => API.post(`/products/addNew`, data);


// users Routes
const signUp = (data) => API.post(`/register`, data);
const signIn = (data) => API.post(`/signin`, data);
const getAllusers = (data) => API.get(`/users`, data);
const delUser = (id) => API.delete(`/users/deleteUser/${id}`);


// order routes
const createOrder = (data) => API.post(`/order/postNewOrder`, data);
const getMyOrders = (id) => API.get(`/orders/myOrders/${id}`);
const getMyOrderDet = (id) => API.get(`/orders/getmyOrders/${id}`);
const getAllOrders = (id) => API.get(`/orders/allOrders`);
const getUserOrder = (id) => API.get(`/orders/getSingle/${id}`);
const updateStatus = (id, data) => API.put(`/orders/updateOrder/${id}`, data);
const cancelThisOrder = (id) => API.delete(`/orders/deleteOrder/${id}`);



module.exports = {
    getAllProducts,
    getSingleProd,
    addProduct,
    signUp,
    signIn,
    createOrder,
    getMyOrders,
    getAllusers,
    delUser,
    getMyOrderDet,
    getUserOrder,
    updateStatus,
    getAllOrders,
    cancelThisOrder
}