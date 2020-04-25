import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  return createStore(
    combineReducers({ user: userReducer }),
    composeEnhancer(applyMiddleware(thunk))
  );
};

export default configureStore;
