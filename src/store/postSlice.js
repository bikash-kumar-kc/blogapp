import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isPosts:false,
    posts:null
}

const postSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{
        setPosts:(state,action)=>{
            state.isPosts=true;
            state.posts= action.payload
            console.log(action.payload)
        },
        deletePosts:(state,action)=>{
            state.isPosts=false,
            state.posts=null
        }
    }
})


export const {setPosts,deletePosts} = postSlice.actions
export default postSlice.reducer