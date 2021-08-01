const postEditReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_EDIT_REQUEST":
      return {
        loading: true,
      };

    case "POST_EDIT_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "POST_EDIT_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { postEditReducer };
