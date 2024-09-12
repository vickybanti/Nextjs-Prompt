'use client';
import React from 'react'
import { useState } from 'react'
import {useSession} from 'next-auth'
import {useRouter} from 'next/navigation'

import Form from '@components/Form'
import { create } from 'domain';

function CreatePrompt() {
    const router = useRouter();
    const  {data: session} = useSession();


    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    });

    const newPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res  = await fetch('/api/prompt/new',{
                method:"POST",
                body: JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
                    tag:post.tag
                })
                
                
            })
            if (res.ok){
                router.push('/')
        }
            
        } catch (error) {
            console.error(error.message)
        } finally{
            setSubmitting(false)
        }
    }

  return (
    <Form 
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={newPrompt}



    />
  )
}

export default CreatePrompt