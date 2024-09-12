"use client"

import { useState, useEffect } from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import MyProfile from '@components/Profile'

import React from 'react'

function Profile() {
  const router = useRouter();
  const [posts, setPosts] = useState([])

  const {data:session} = useSession()
  console.log({data:session})
  useEffect(()=>{
    const fetchPost = async ()=> {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await res.json();
        setPosts(data)
    }
    if(session?.user.id) fetchPost();

    
},[])


  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete =async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete prompt?")
    if(hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method:'DELETE'
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id)
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <MyProfile 
    name="My"
    desc="Welcome to your personalized page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}

    />
  )
}

export default Profile