import axios from "axios";

const userUpdateAction = (userInfo) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_UPDATE_REQUEST",
      });
      const res = await axios.put("/api/user/" + userInfo.userId, userInfo);

      dispatch({
        type: "USER_UPDATE_SUCCESS",
      });

      localStorage.setItem("userAuth", JSON.stringify(res.data));
    } catch (error) {
      dispatch({
        type: "USER_UPDATE_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { userUpdateAction };
