import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
    name: "products",
    initialState:{
        products: [],
        product: {},
        isFetching: false,
        error: false,
    },
    reducers: {

        // get All Products
        getProductStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload
        },
        getProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },


        //  Single Product
        getProdDetailsStart:(state, action) => {
            state.isFetching = false;
            state.error = true;
        },
        getProdDetailSuccess: (state, action) => {
            state.isFetching = false;
            state.product = action.payload;
        },
        getProdDetailFailure: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});


export const {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    getProdDetailsStart,
    getProdDetailSuccess,
    getProdDetailFailure
} = productsSlice.actions;

export default productsSlice.reducer;