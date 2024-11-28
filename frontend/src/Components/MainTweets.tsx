import React from 'react'
import AllTweets from './AllTweets'

export const MainTweets: React.FC = () => {
  return (
    <div>
        <p className='font-bold pl-2 my-2'>Username</p>
        <form className='border-b-2 pb-6'>
            <textarea className='bg-slate-200 w-full  p-2 border border-slate-300 rounded-lg' 
             placeholder='What`s happening?'
             maxLength={280}/>
             <button className='bg-blue-500 text-white px-4 py-1 rounded-full ml-auto mt-2'>Post</button>
        </form>
        <AllTweets />
    </div>
  )
}