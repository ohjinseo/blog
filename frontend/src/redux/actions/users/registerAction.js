import axios from "axios";

const registerAction = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_REGISTER_REQUEST",
      });

      const res = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: res.data,
      });

      localStorage.setItem("auth", JSON.stringify(res.data));
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload: error.response.data.message,
      });
    }
  };
};

export { registerAction };
