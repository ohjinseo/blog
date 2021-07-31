import axios from "axios";

const userGetAction = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_GET_REQUEST",
      });

      const res = await axios.get("/api/user/" + userId);

      dispatch({
        type: "USER_GET_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "USER_GET_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { userGetAction };
