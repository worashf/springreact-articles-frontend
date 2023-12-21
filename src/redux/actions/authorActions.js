import {
    NEW_AUTHOR_REQUEST, NEW_AUTHOR_SUCCESS,
    NEW_AUTHOR_FAIL, DELETE_AUTHOR_REQUEST, DELETE_AUTHOR_SUCCESS,
    DELETE_AUTHOR_FAIL, CLEAR_ERRORS,
    UPDATE_AUTHOR_REQUEST, UPDATE_AUTHOR_SUCCESS,
    UPDATE_AUTHOR_FAIL, ALL_AUTHORS_REQUEST,
    ALL_AUTHORS_SUCCESS, ALL_AUTHORS_FAIL

} from "../constants/authorConstants"
import axiosInstance  from "../../config/axiosInstance";




export const newAuthor = (authorData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_AUTHOR_REQUEST });

        const { data } = await axiosInstance.post(
            `/authors/create`,
            authorData,

        );

        dispatch({
            type: NEW_AUTHOR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_AUTHOR_FAIL,
            payload: error.response.data.message,
        });
    }
};



// Delete author
export const deleteAuthor = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_AUTHOR_REQUEST });
        const { data } = await axiosInstance.delete(`/authors/${id}`);

        dispatch({
            type: DELETE_AUTHOR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_AUTHOR_FAIL,
            payload: error.response.data.errorMessage,
        });
    }
};


// Update Author
export const updateAuthor = (id, authorData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_AUTHOR_REQUEST });



        const { data } = await axiosInstance.put(
            `/authors/${id}`,
            authorData,
        );

        dispatch({
            type: UPDATE_AUTHOR_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_AUTHOR_FAIL,
            payload: error.response.data.errorMessage,
        });
    }
};


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};


export const getAllAuthors =( ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_AUTHORS_REQUEST,
      });
      let link = `/authors`;
      const res = await axiosInstance.get(link);
      console.log(res.data, "res")
      dispatch({
        type: ALL_AUTHORS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ALL_AUTHORS_FAIL,
        payload: error.response.data.errorMessage,
      });
    }
  };