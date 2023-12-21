import { configureStore} from "@reduxjs/toolkit"
import {newAuthorReducer, authorActionReducer,authorReducer}  from "./reducers/authorReducer"
import {articleReducer,newArticleReducer} from "./reducers/articlereducer"

const rootReducer ={
    authors: authorReducer,
    newAuthor: newAuthorReducer,
    authorAction: authorActionReducer,
    newArticle: newArticleReducer,
    articles: articleReducer

}


const store = configureStore({
  reducer: rootReducer,
})

export default store