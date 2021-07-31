import axios from "axios";

const postAllGetAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "POST_GET_REQUEST",
      });

      const res = await axios.get("/api/post/");

      dispatch({
        type: "POST_GET_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "POST_GET_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

const postIdFromGetAction = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "POSTID_GET_REQUEST",
      });

      const res = await axios.get(`/api/post?postId=${postId}`);

      dispatch({
        type: "POSTID_GET_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "POSTID_GET_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { postAllGetAction, postIdFromGetAction };
