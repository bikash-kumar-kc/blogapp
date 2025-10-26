import { useEffect, useState } from "react";
import "./App.css";
import { useMutation } from "@tanstack/react-query";
import authenservice from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import {Header,Footer} from "./components/index"
import { Outlet } from "react-router";
import storage from "./appwrite/storage";
import databaseservices from "./appwrite/database";
import { setPosts } from "./store/postSlice";

function App() {
  const dispatch = useDispatch();

  const { mutate, isLoading,isError,error } = useMutation({
    mutationKey: ["get-current-user"],
    mutationFn: authenservice.getCurrentUser,
    onSuccess: (userData) => {
      console.log(userData)
      if (userData) dispatch(login(userData));
       
    },
    onError: (error) => {
      if(error) dispatch(logout());
      console.log(error);
    },
  });

  const {mutate: getposts} = useMutation({
    mutationKey:["getting-all-post"],
    mutationFn:databaseservices.gettingPosts,
    onSuccess:async(data)=>{
      const posts = data.rows
      for(let i=0;i<posts.length;i++){
        const imageUrl = await storage.getFile(posts[i].featuredImage)
        // console.log(imageUrl)
        posts[i].imageUrl = imageUrl;
      }
      dispatch(setPosts(posts))
      console.log(posts[0].imageUrl+"hey")
      
    }
  })

  useEffect(() => {
    mutate();
    getposts();
  }, []);
 
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App;
