const userGetReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_GET_REQUEST":
      return {
        loading: true,
      };
    case "USER_GET_SUCCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };

    case "USER_GET_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { userGetReducer };
