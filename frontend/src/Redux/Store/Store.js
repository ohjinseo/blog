import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { userLoginReducer } from "../Reducers/users/userLoginReducer";
import { userRegisterReducer } from "../Reducers/users/userRegisterReducer";
import { postRegisterReducer } from "../Reducers/posts/postRegisterReducer";
import {
  postGetReducer,
  postIdFromGetReducer,
} from "../Reducers/posts/postGetReducer";
import { userGetReducer } from "../Reducers/users/userGetReducer";

const middleWares = [thunk];

const reducer = combineReducers({
  userRegisterReducer,
  userLoginReducer,
  postRegisterReducer,
  postGetReducer,
  postIdFromGetReducer,
  userGetReducer,
});

const userAuth = localStorage.getItem("userAuth")
  ? JSON.parse(localStorage.getItem("userAuth"))
  : null;

const initState = {
  userLoginReducer: {
    userInfo: userAuth,
  },
};

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export { store };
