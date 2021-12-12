import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer , persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducers'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

export let persistor = persistStore(store)