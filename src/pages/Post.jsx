import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import databaseservices from "../appwrite/database";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import storage from "../appwrite/storage";
import { useMutation } from "@tanstack/react-query";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [imageUrl,setImageUrl]= useState("")

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;


  const {mutate}= useMutation({
    mutationKey:["getting image"],
    mutationFn:storage.getFile,
    onSuccess:(data)=>{
      console.log(data)
      if(data) setImageUrl(data)
    }

  })






  useEffect(() => {
    if (slug) {
      databaseservices.gettingaPost(slug).then((post) => {
        if (post) {
          setPost(post)
          mutate(post.featuredImage)
        }
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    databaseservices.deletingPost(post.$id).then((status) => {
      if (status) {
        storage.deletingFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post && imageUrl ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={imageUrl}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;
