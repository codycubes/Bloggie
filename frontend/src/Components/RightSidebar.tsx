import React from 'react'

export const RightSidebar: React.FC = () => {
  return (
    <div className='p-6 fixed  rounded-lg mx-6 space-y-4'>
        <h2 className='font-bold text-3xl'>Trending</h2>
        <p className='font-semibold'>#Eskom</p>
        <p className='font-semibold'>#Sundowns</p>
        <p className='font-semibold'>#Magesi</p>
        <p className='font-semibold'>#BiriMarung</p>

    </div>
  )
}