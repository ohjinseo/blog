import axios from "axios";

const loginAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_LOGIN_REQUEST",
      });

      const res = await axios.post("/api/user/login", { email, password });

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: res.data,
      });

      localStorage.setItem("auth", JSON.stringify(res.data));
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload: error.response.data.message,
      });
    }
  };
};

export { loginAction };
