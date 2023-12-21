
import {
    NEW_ARTICLE_REQUEST,NEW_ARTICLE_SUCCESS,NEW_ARTICLE_FAIL, NEW_ARTICLE_RESET,
     ALL_ARTICLES_REQUEST,ALL_ARTICLES_SUCCESS,ALL_ARTICLES_FAIL,CLEAR_ERRORS

 } from "../constants/articleConstants"


export const newArticleReducer = (state = { article: {} }, action) => {
    switch (action.type) {
      case NEW_ARTICLE_REQUEST:
        return {
          ...state,
          loading: true,
        };

      case NEW_ARTICLE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          article: action.payload.article,
        };

      case NEW_ARTICLE_FAIL:
        return {
          ...state,
          error: action.payload,
        };

      case NEW_ARTICLE_RESET:
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


  export const articleReducer = (state = { articles: [] }, action) => {
    switch (action.type) {
      case ALL_ARTICLES_REQUEST:
        return {
          loading: true,
          articles: [],
        };

      case ALL_ARTICLES_SUCCESS:
        return {
          loading: false,
          articles: action.payload,
        };

      case ALL_ARTICLES_FAIL:
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

