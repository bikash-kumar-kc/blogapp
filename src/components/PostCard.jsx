import React, { useEffect, useState } from 'react'
import authenservice from '../appwrite/auth'
import { Link } from 'react-router'
import storage from '../appwrite/storage'
import { useMutation } from '@tanstack/react-query'


const PostCard = ({$id,title,featuredImage,imageUrl}) => {


  //   const [imageUrl,setImageUrl] = useState("")

  //   const {mutate}= useMutation({
  //   mutationKey:["getting image"],
  //   mutationFn:storage.getFile,
  //   onSuccess:(data)=>{
  //     console.log(data)
  //     if(data) setImageUrl(data)
  //   }

  // })

  // useEffect(()=>{
  //   if(featuredImage) mutate(featuredImage)
  // },[featuredImage])

  
  return (
   <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={imageUrl} alt={title} className='rounded-xl' />
        </div>

        <h2
         className='text-xl font-bold'
        >
            {title}
        </h2>
    </div>
   </Link>
  )
}

export default PostCard
