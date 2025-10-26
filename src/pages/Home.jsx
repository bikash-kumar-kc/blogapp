import React, { useState, useEffect } from "react";
import databaseservices from "../appwrite/database";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const authStatus = useSelector((store)=>store.auth.status)
  const isposts = useSelector((store)=> store.blog.isPosts);
  const posts = useSelector(store=>store.blog.posts)

  if (!isposts || !authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='w-full py-8 '>
<Container>
    <div className="flex flex-wrap gap-4 ">
        {posts.map((post)=>(
            <div key={post.$id} className='w-1/3 py-8 ' >
                <PostCard {...post} />
            </div>
        ))}
    </div>
</Container>
    </div>
  )
};

export default Home;
