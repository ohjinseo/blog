const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_DELETE_REQUEST":
      return {
        loading: true,
      };

    case "POST_DELETE_SUCCESS":
      return {
        loading: false,
      };

    case "POST_DELETE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { postDeleteReducer };
