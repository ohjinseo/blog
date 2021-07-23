const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: false,
      };

    case "USER_LOGIN_SUCCESS":
      return {
        user: action.payload,
      };

    case "USER_LOGIN_FAIL":
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

export { loginReducer };
