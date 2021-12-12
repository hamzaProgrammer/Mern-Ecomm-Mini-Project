import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products: [],
        quantity: 0,
        total: 0,
        isFetching : false,
        error : false,
        shippingAddress: {},
        payment: '',
    },
    reducers: {
        // adding to cart
        addProduct: (state, action) => {
            const alreadyExists = state.products.find(
                (item) => item._id === action.payload.product.id
            )
            if (alreadyExists){
                state.products = state.products.map(item => item.id === action.payload.product.id ? action.payload.product : item)
            }else{
                state.quantity += 1;
                state.products.push(action.payload.product);
                state.total += action.payload.product.price * action.payload.quantity;
            }
        },

        // updating cart Item
        updateCart: (state, action) => {
            const ItemIndex = state.products.findIndex(item => item.id === action.payload.product.id)

            if (action.payload.type === "inc") {
                state.products[ItemIndex].sentQty += 1;
                state.total += action.payload.product.price * action.payload.product.sentQty;
            }else{
                if (state.products[ItemIndex].sentQty > 1 ){
                    state.products[ItemIndex].sentQty -= 1;
                    state.total -= action.payload.product.price * ( action.payload.product.sentQty - 1 );
                } else if (state.products[ItemIndex].sentQty === 1) {
                    state.products[ItemIndex].sentQty = 1;
                }
            }
        },

        // deleting from cart
        deleteProduct: (state, action) => {
            state.quantity -= 1;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload.id) , 1
            );
            state.total -= action.payload.price;
        },

        // adding shipping details
        addShippingAddress: (state , action) => {
            state.shippingAddress = action.payload;
        },

        // adding payment
        addPayment: (state, action) => {
            state.payment = action.payload;
        },

        // setting cart to null
        setProductsInCart:(state , action) => {
            console.log("Reached in  Reducer : ")
            state.products = []
        }
    }
});


export const {
    addProduct,
    deleteProduct,
    updateCart,
    addShippingAddress,
    addPayment,
    setProductsInCart
} = cartSlice.actions;
export default cartSlice.reducer;