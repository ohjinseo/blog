const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    //USER LOGIN
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        loding: false,
        userInfo: action.payload,
      };

    case "USER_LOGIN_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { userLoginReducer };
