import React from 'react'
import Link from 'next/link'

function Form({type, post, setPost, submitting, handleSubmit}) {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type}</span> Post
        </h1>

        <p className='desc text-left max-w-md'>
          {type} and share your amazing prompt with the world
        </p>

        <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
          <label>
            <span className='font-satoshi font-semibold text-based text-gray-700'>Your AI prompt</span>
          </label>
          <label>
          <span className='font-satoshi font-semibold text-based text-gray-700'>
            Prompt {` `}
            </span>
          
          <textarea
            value={post.prompt}
            onChange={(e)=>setPost({...post, prompt:e.target.value})}
            placeholder='Write your prompt here'
            required
            className='form_textarea'
          />

          <span className='font-satoshi font-semibold text-based text-gray-700'>
            Tag {` `}
            </span>
            <span className='font-normal'>(#product, #webdevelopment)</span>

          <input
          value={post.tag}
            onChange={(e) => setPost({...post,tag:e.target.value})}
            placeholder="#tag"
            required
            className='form_input'
          />
</label>

<div className='flex-end mx-3 mb-5 gap-4'>
  <Link href="/" className='text-gray-500'>
  Cancel
  </Link>

  <button
  type="submit"
  disabled={submitting}
  className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
  >
    {submitting ? `${type}ing...`: type}

  </button>
</div>


        </form>
    </section>
  )
}

export default Form