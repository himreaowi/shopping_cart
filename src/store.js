import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootReducer.js';

const middlewares = [thunk];


const store = createStore(rootReducer,{}, applyMiddleware(...middlewares))

export default store;
/*function configureStore(state = { rotating: true }) {
  return createStore(rootReducer,state);
}

export default configureStore;*/