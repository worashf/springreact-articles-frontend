import {
   NEW_ARTICLE_REQUEST,NEW_ARTICLE_SUCCESS,NEW_ARTICLE_FAIL,
    ALL_ARTICLES_REQUEST,ALL_ARTICLES_SUCCESS,ALL_ARTICLES_FAIL,CLEAR_ERRORS

} from "../constants/articleConstants"
import axiosInstance  from "../../config/axiosInstance";




export const newArticle = (articleData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ARTICLE_REQUEST });

        const { data } = await axiosInstance.post(
            `/articles/create`,
            articleData,

        );

        dispatch({
            type: NEW_ARTICLE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_ARTICLE_FAIL,
            payload: error.response.data.message,
        });
    }
};





export const getAllArticles =( ) => async (dispatch) => {
    try {
      dispatch({
        type: ALL_ARTICLES_REQUEST,
      });
      let link = `/articles`;
      const res = await axiosInstance.get(link);
      dispatch({
        type: ALL_ARTICLES_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ARTICLES_FAIL,
        payload: error.response.data.errorMessage,
      });
    }
  };




export const clearErrors = () => async (dispatch) => {
  dispatch({
      type: CLEAR_ERRORS,
  });
};
