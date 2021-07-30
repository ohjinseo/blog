const postRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_REGISTER_REQUEST":
      return {
        loading: true,
      };
    case "POST_REGISTER_SUCCESS":
      return {
        loading: false,
        postInfo: action.payload,
      };

    case "POST_REGISTER_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { postRegisterReducer };
