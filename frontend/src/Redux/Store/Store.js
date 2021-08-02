import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { userLoginReducer } from "../Reducers/users/userLoginReducer";
import { userRegisterReducer } from "../Reducers/users/userRegisterReducer";
import { postRegisterReducer } from "../Reducers/posts/postRegisterReducer";
import {
  postGetReducer,
  postIdFromGetReducer,
  postGetCategoryReducer,
  postFromUserIdGetReducer,
} from "../Reducers/posts/postGetReducer";
import { userGetReducer } from "../Reducers/users/userGetReducer";
import { postDeleteReducer } from "../Reducers/posts/postDeleteReducer";
import { postEditReducer } from "../Reducers/posts/postEditReducer";
import { postLikeReducer } from "../Reducers/posts/postLikeReducer";
import { userUpdateReducer } from "../Reducers/users/userUpdateReducer";

const middleWares = [thunk];

const reducer = combineReducers({
  userRegisterReducer,
  userLoginReducer,
  postRegisterReducer,
  postGetReducer,
  postIdFromGetReducer,
  userGetReducer,
  postDeleteReducer,
  postEditReducer,
  postGetCategoryReducer,
  postLikeReducer,
  postFromUserIdGetReducer,
  userUpdateReducer,
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
