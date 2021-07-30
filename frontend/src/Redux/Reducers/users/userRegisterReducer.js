const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    //USER REGISTER
    case "USER_REGISTER_REQUEST":
      return {
        loading: true,
      };

    case "USER_REGISTER_SUCCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };

    case "USER_REGISTER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { userRegisterReducer };
