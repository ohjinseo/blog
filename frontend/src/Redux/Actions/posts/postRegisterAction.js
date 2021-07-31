import axios from "axios";

const postRegisterAction = ({ title, desc, category, _id, image }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "POST_REGISTER_REQUEST",
      });
      const res = await axios.post("/api/post/register", {
        title,
        desc,
        category,
        userId: _id,
        image,
      });

      dispatch({
        type: "POST_REGISTER_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "POST_REGISTER_FAIL",
        payload: error.response && error.response.data,
      });
    }
  };
};

export { postRegisterAction };
