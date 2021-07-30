import axios from "axios";

const userLoginAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_LOGIN_REQUEST",
      });

      const res = await axios.post("/api/user/login", {
        email,
        password,
      });

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: res.data,
      });

      localStorage.setItem("userAuth", JSON.stringify(res.data));
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { userLoginAction };
