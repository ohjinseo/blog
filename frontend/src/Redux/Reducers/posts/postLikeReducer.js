const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_LIKE_REQUEST":
      return {
        loading: true,
      };
    case "POST_LIKE_SUCCESS":
      return {
        success: true,
        loading: false,
      };

    case "POST_LIKE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { postLikeReducer };
