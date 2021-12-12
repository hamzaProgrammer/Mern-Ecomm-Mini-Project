import {
    createOrder,
    getMyOrders,
    getUserOrder,
    updateStatus,
    getAllOrders
} from '../server_api/Api'
import {
    getOrderStart,
    getOrderSuccess,
    getOrderFailures,
    getMyOrderStart,
    getMyOrderSuccess,
    getMyOrderFailures,
    getUserOrderStart,
    getUserOrderSuccess,
    getUserOrderFailures,
    getAllOrdersSuccess,
    cancelMyOrder
 } from '../redux/OrderReducer'

import {setProductsInCart} from '../redux/cartReducer'



 // adding New Order
export const addNewOrder = (myData) => async (dispatch) => {
     dispatch(getOrderStart())
     try {
        const { data } = await createOrder(myData);
        dispatch(getOrderSuccess(data))
        dispatch(setProductsInCart());
    } catch (error) {
        dispatch(getOrderFailures())
    }
}

// getting user Orders
export const getAllmyOrders = (id) => async (dispatch) => {
    dispatch(getMyOrderStart())
    try {
        const { data } = await getMyOrders(id);

        dispatch(getMyOrderSuccess(data?.gotOrders))
    } catch (error) {
        dispatch(getMyOrderFailures())
    }
}

// getting All Orders
export const getAllRedOrders = (id) => async (dispatch) => {
    dispatch(getMyOrderStart())
    try {
        const { data } = await getAllOrders(id);

        dispatch(getAllOrdersSuccess(data?.gotOrders))
    } catch (error) {
        dispatch(getMyOrderFailures())
    }
}

// Getting User Orders
export const getUserCurntOrder = (id) => async (dispatch) => {
    dispatch(getUserOrderStart())
    try {
        const { data } = await getUserOrder(id);

        dispatch(getUserOrderSuccess(data?.gotOrders))
    } catch (error) {
        dispatch(getUserOrderFailures())
    }
}

// Updating Status of Orders
export const UpdateUserOrder = (id , Mydata) => async (dispatch) => {
    dispatch(getUserOrderStart())
    try {
        const { data } = await updateStatus(id , Mydata);
        dispatch(getUserOrderSuccess(data?.gotOrders))
    } catch (error) {
        dispatch(getUserOrderFailures(error))
    }
}

// Cancelling Order Status of Orders
export const cancelOrder = (id) => async (dispatch) => {
    dispatch(getUserOrderStart())
    try {
        //const { data } = await cancelThisOrder(id);
        dispatch(cancelMyOrder(id))
    } catch (error) {
        dispatch(getUserOrderFailures(error))
    }
}