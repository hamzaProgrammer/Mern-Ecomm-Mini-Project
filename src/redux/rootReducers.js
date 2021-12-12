import { combineReducers } from 'redux';
// reducers importing
import cartReducer from './cartReducer'
import prodReducer from './ProductReducer'
import orderReducer from './OrderReducer'


const rootReducer = combineReducers({
    prodReducer: prodReducer,
    cart: cartReducer,
    orderReducer
});
export default rootReducer