/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState} from 'react'
import { LeftSidebar } from '../Components/LeftSidebar'
import { RightSidebar } from '../Components/RightSidebar'
// import { Navbar } from '../Components/Navbar'
import pp from '../images/profPic.png'
import { Link } from 'react-router-dom'

export const Profile: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Posts');

    return (
    <>
        {/* <Navbar /> */}
        <div className='grid cols-1 md:grid-cols-4'>
            <div className='px-4'>
                <LeftSidebar />
            </div>

        <div className='col-span-2 border-x-2 border-t-slate-800 px-4'>
            {/* Profile heading and edit button */}
            <div className='bg-slate-900 h-60 relative'>
                <div className='grid grid-cols-3'>
                    <div className='relative flex justify-center items-center my-52'>
                        <div className='border-4 border-slate-200 rounded-full'>
                            <img src={"/vite.svg"} className='size-12 rounded-full'></img>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-start mt-20 ' style={{ marginLeft: '-32px' }}>
                        <p className='font-bold text-2xl'>Username</p>
                        <p className='font-bold'>@username</p>
                    </div> 

                    <div className='flex justify-end items-center mt-20 mr-5'>
                        <Link to='/edit'>
                            <button className='bg-blue-500 text-white px-3 py-2 rounded-3xl'>Edit profile</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-evenly border-b-2 border-slate-300 ml-5'>
                <div className='mt-20 mb-3'>
                    <p className='mt-2'>Bio goes here</p>
                </div>
                <div className='flex space-x-10 mb-3 mt-10'>
                    <p className='font-semibold '>52 Followers</p>
                    <p className='font-semibold '>10 Following</p>
                </div>
            </div>
            {/* 2nd section of profile page */}
            <div className='flex space-x-7 mt-3 mb-5 ml-5'>
                <p className={`font-bold text-lg cursor-pointer ${selectedTab === 'Posts' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setSelectedTab('Posts')}>Posts </p>
                <p className={`font-bold text-lg cursor-pointer ${selectedTab === 'Likes' ? 'border-b-2 border-blue-500' : ''}`}
                     onClick={() => setSelectedTab('Likes')}>Likes </p>
                <p className={`font-bold text-lg cursor-pointer ${selectedTab === 'Media' ? 'border-b-2 border-blue-500' : ''}`}
                    onClick={() => setSelectedTab('Media')}> Media </p>

            </div>
            {/* Post */}
            <div className='container mx-auto px-5'>
                <div className='flex flex-col'>
                    <p>Posts will go here</p>
                </div>
                
            </div>

        </div>

            <div className='px-4'>
                <RightSidebar />
            </div>
    
    
        </div>
        
    </>
    
  )
}