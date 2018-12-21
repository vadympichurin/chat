import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/index.js";

const store = createStore(rootReducer, composeWithDevTools())

export default store;