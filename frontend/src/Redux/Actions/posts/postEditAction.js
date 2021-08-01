import axios from "axios";

const postEditAction = ({ title, desc, category, _id, image, postId }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "POST_EDIT_REQUEST",
      });

      await axios.put("/api/post/" + postId, {
        title,
        desc,
        category,
        userId: _id,
        image,
      });

      dispatch({
        type: "POST_EDIT_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "POST_EDIT_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { postEditAction };
