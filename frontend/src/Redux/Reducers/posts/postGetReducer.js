const postGetReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_GET_REQUEST":
      return {
        loading: true,
      };
    case "POST_GET_SUCCESS":
      return {
        loading: false,
        posts: action.payload,
      };
    case "POST_GET_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const postIdFromGetReducer = (state = {}, action) => {
  switch (action.type) {
    case "POSTID_GET_REQUEST":
      return {
        loading: true,
      };
    case "POSTID_GET_SUCCESS":
      return {
        loading: false,
        post: action.payload,
      };
    case "POSTID_GET_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const postFromUserIdGetReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_FROM_USERID_GET_REQUEST":
      return {
        loading: true,
      };
    case "POST_FROM_USERID_GET_SUCCESS":
      return {
        loading: false,
        userPosts: action.payload,
      };
    case "POST_FROM_USERID_GET_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const postGetCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_CATEGORY_GET_REQUEST":
      return {
        loading: true,
      };

    case "POST_CATEGORY_GET_SUCCESS":
      return {
        loading: false,
        posts: action.payload,
      };

    case "POST_CATEGORY_GET_FAIL":
      return {
        loading: false,
        error: action.type,
      };

    default:
      return state;
  }
};

export {
  postGetReducer,
  postIdFromGetReducer,
  postGetCategoryReducer,
  postFromUserIdGetReducer,
};
