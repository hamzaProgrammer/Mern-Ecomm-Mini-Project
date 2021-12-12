import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: "orders",
    initialState:{
        isFetching : false,
        error : false,
        orders : [],
        myOrders : [],
        userOrder : [],
        allOrders : []
    },
    reducers: {
        // Add new Orders
        getOrderStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        getOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.orders.push(action.payload);
        },
        getOrderFailures: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },


        // get Orders of specific user
        getMyOrderStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        getMyOrderSuccess: (state, action) => {
            state.isFetching = false;
            console.log("In reducer :", action.payload)
            state.myOrders = action.payload;
        },
        getMyOrderFailures: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },

        // get any single Order Details
        getUserOrderStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserOrderSuccess: (state, action) => {
            state.isFetching = false;
            state.userOrder = action.payload;
        },
        getUserOrderFailures: (state, action) => {
            state.isFetching = false;
            state.error = true;
            console.log("Error in Reducer : ", action.payload)
        },

        // getting all orders
        getAllOrdersSuccess: (state, action) => {
            state.isFetching = false;
            state.allOrders = action.payload;
        },


        // deleting from cart
        // deleteOrder: (state, action) => {
        //     state.quantity -= 1;
        //     state.products.splice(
        //         state.products.findIndex((item) => item._id === action.payload.id) , 1
        //     );
        //     state.total -= action.payload.price;
        // },

    }
});


export const {
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
} = orderSlice.actions;
export default orderSlice.reducer;