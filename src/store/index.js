import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/Product.reducer";

const rootReducer = combineReducers({ productReducer });

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);
