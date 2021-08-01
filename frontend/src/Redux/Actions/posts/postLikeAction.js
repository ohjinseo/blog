import axios from "axios";

const postLikeAction = (postId, userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "POST_LIKE_REQUEST",
      });

      await axios.put(`/api/post/like/${postId}`, { userId });

      dispatch({
        type: "POST_LIKE_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "POST_LIKE_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { postLikeAction };
