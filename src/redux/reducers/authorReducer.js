import { DELETE_ARTICLE_RESET, UPDATE_ARTICLE_RESET } from "../constants/articleConstants";
import {
    NEW_AUTHOR_REQUEST, NEW_AUTHOR_SUCCESS,
    NEW_AUTHOR_FAIL, NEW_AUTHOR_RESET, DELETE_AUTHOR_REQUEST, DELETE_AUTHOR_SUCCESS,
    DELETE_AUTHOR_FAIL, DELETE_AUTHOR_RESET,CLEAR_ERRORS, UPDATE_AUTHOR_RESET,
    UPDATE_AUTHOR_REQUEST, UPDATE_AUTHOR_SUCCESS,
    UPDATE_AUTHOR_FAIL, ALL_AUTHORS_REQUEST,
    ALL_AUTHORS_SUCCESS, ALL_AUTHORS_FAIL

} from "../constants/authorConstants"



export const newAuthorReducer = (state = { author: {} }, action) => {
    switch (action.type) {
      case NEW_AUTHOR_REQUEST:
        return {
          ...state,
          loading: true,
        };

      case NEW_AUTHOR_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          author: action.payload.author,
        };

      case NEW_AUTHOR_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      case NEW_AUTHOR_RESET:
        return {
          ...state,
          success: false,
        };

      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
  };

  export const authorActionReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_AUTHOR_REQUEST:
      case UPDATE_AUTHOR_REQUEST:
        return {
          ...state,
          loading: true,
        };

      case DELETE_AUTHOR_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
        case UPDATE_AUTHOR_SUCCESS:
            return {
              ...state,
              loading: false,
              isUpdated: action.payload,
            };

          case DELETE_AUTHOR_FAIL:
          case UPDATE_AUTHOR_FAIL:
            return {
              ...state,
              error: action.payload,
            };

          case DELETE_AUTHOR_RESET:
            return {
              ...state,
              isDeleted: false,
            };

          case UPDATE_AUTHOR_RESET:
            return {
              ...state,
              isUpdated: false,
            };

          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };

          default:
            return state;
        }
      };

      export const authorReducer = (state = { authors: [] }, action) => {
        switch (action.type) {
          case ALL_AUTHORS_REQUEST:
            return {
              loading: true,
              authors: [],
            };

          case ALL_AUTHORS_SUCCESS:
            return {
              loading: false,
              authors: action.payload,
            };

          case ALL_AUTHORS_FAIL:
            return {
              loading: false,
              error: action.payload,
            };
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };
