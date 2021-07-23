const logoutAction = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("auth");
      dispatch({
        type: "USER_LOGOUT_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "USER_LOGOUT_FAIL",
        payload: error.response.data.message,
      });
    }
  };
};

export { logoutAction };
