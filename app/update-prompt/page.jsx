'use client';
import React from 'react'
import { useState,useEffect } from 'react'
import {useRouter} from 'next/navigation'
import { useSearchParams } from 'next/navigation';

import Form from '@components/Form'

function EditPrompt() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    });

    useEffect(()=>{
        const getPrompt = async () => {
            const response = await fetch(`api/prompt/${promptId}`)
            console.log('response',response)
            const data = await response.json();
            console.log('data', data)

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })

            
        }
        if(promptId) getPrompt();
    },[promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt ID not found')

        try {
            const res  = await fetch(`/api/prompt/${promptId}`,{
                method:"PATCH",
                body: JSON.stringify({
                    prompt:post.prompt,
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
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}



    />
  )
}

export default EditPrompt