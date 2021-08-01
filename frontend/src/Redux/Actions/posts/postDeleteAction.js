import axios from "axios";

const postDeleteAction = (postId, userId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "POST_DELETE_REQUEST",
      });
      console.log(userId);
      const res = await axios.delete(`/api/post/${postId}`, {
        data: {
          userId,
        },
      });

      dispatch({
        type: "POST_DELETE_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "POST_DELETE_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { postDeleteAction };
