const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGOUT_SUCCESS":
      return {};
    default:
      return state;
  }
};

export { logoutReducer };
