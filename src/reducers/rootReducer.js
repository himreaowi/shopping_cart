import { combineReducers } from 'redux';

import cartReducer from './cartReducer.js'
import allProductsReducer from './allProductsReducer.js';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: allProductsReducer
})

export default rootReducer