import {configureStore} from "@reduxjs/toolkit"
import authReducers from "./authSlice"
import postsReducers from "./postSlice"


const store = configureStore({
    reducer :{
        auth:authReducers,
        blog:postsReducers,
    }
})

export default store