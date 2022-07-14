import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({});

const middleware = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleware);
