import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { registerReducer } from "../reducers/registerReducer";
import { loginReducer } from "../reducers/loginReducer";
import { logoutReducer } from "../reducers/logoutReducer";

const middlewares = [thunk];

const reducers = combineReducers({
  registerReducer,
  loginReducer,
  logoutReducer,
});

const userAuthFromStorage = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  loginReducer: {
    user: userAuthFromStorage,
  },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export { store };
