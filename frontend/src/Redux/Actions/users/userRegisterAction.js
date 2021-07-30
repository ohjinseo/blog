import axios from "axios";

const userRegisterAction = (name, email, password, checkPassword) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_REGISTER_REQUEST",
      });

      const res = await axios.post("/api/user/register", {
        name,
        email,
        password,
        checkPassword,
      });

      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { userRegisterAction };
