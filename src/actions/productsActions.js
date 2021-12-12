import { getAllProducts , getProduct } from '../server_api/Api'
import {
    getProductStart,
    getProductFailure,
    getProductSuccess,
    getProdDetailsStart,
    getProdDetailSuccess,
    getProdDetailFailure
 } from '../redux/ProductReducer'



 // get All Products
export const listProducts = () => async (dispatch) => {
     dispatch(getProductStart())
     try {
        const { data } = await getAllProducts();
        dispatch(getProductSuccess(data?.allProducts))
    } catch (error) {
        dispatch(getProductFailure())
    }
}



// getSingle Product
export const getSingleProduct = () => async (dispatch , id) => {
    dispatch(getProdDetailsStart())
    try {
        const { data } = await getProduct(`/products/getSingleProduct/${id}`);
        dispatch(getProdDetailSuccess(data))
    } catch (error) {
        dispatch(getProdDetailFailure())
    }
}