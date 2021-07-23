const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
      };

    case "USER_REGISTER_SUCCESS":
      return {
        user: action.payload,
        loading: false,
      };

    case "USER_REGISTER_FAIL":
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export { registerReducer };
