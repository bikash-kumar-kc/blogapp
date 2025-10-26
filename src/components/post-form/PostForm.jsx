import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, RTE, Input, Select } from "../index";
import storage from "../../appwrite/storage";
import databaseservices from "../../appwrite/database";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";


const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) =>state.auth.userData);
  const [imageUrl,setImageUrl] = useState("")

  console.log(userData)


  const {mutate}= useMutation({
    mutationKey:["getting image"],
    mutationFn:storage.getFile,
    onSuccess:(data)=>{
      console.log(data)
      if(data) setImageUrl(data)
    }

  })

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storage.creatingFile(data.image[0])
        : null;

      if (file) {
        storage.deletingFile(post.featuredImage);
      }

      const dbPost = await databaseservices.updatingPost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined, 
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await storage.creatingFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await databaseservices.creatingPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback(({title}) => {
   
    if (title && typeof title === "string")
      return title
        .trim()
        .toLocaleLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")

        return ""
  }, []);


  useEffect(()=>{

    if(post) mutate(post.featuredImage)
    const subscription = watch((value,{name})=>{
        if(name === "title"){
            setValue("slug", slugTransform(value),{shouldValidate:true})
        }
    });

    return ()=> subscription.unsubscribe();
  },[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Enter title for your post"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          readOnly
       
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
           defaultValue={getValues("content")} // doubt
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && imageUrl && (
          <div className="w-full mb-4">
            <img
              src={imageUrl}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
