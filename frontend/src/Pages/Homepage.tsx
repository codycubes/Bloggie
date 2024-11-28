import React from 'react';
import { LeftSidebar } from '../Components/LeftSidebar';
import { RightSidebar } from '../Components/RightSidebar';
import { MainTweets } from '../Components/MainTweets';
// import { Navbar } from '../Components/Navbar';

export const Home: React.FC = () => {
  return (
    <>
    {/* <Navbar /> */}

      <div className='grid cols-1 md:grid-cols-4'>
        <div className='px-4'>
          <LeftSidebar  />
        </div>
        <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
          <MainTweets />
        </div>
        <div className='px-4'>
          <RightSidebar />
        </div>
        
      </div>
    </>
    
  );
};