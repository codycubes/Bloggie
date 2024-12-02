import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LeftSidebar } from '../Components/LeftSidebar';
import { RightSidebar } from '../Components/RightSidebar';
import { MainTweets } from '../Components/MainTweets';
import { Profile } from './Profile';
import ProfileEdit from './ProfileEdit';
import AdminPage from './AdminPage';
import PrivateRoute from '../Components/PrivateRoute';

export const Home: React.FC = () => {
  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-4 pt-10 min-h-full bg-black'>
        <div>
          <LeftSidebar />
        </div>
        <div className='col-span-2 border-x-2 border-t-slate-800'>
          <Routes>
            
            <Route path="/profile" element={<PrivateRoute>
              <Profile />
              </PrivateRoute>} />
            
            {/* <Route path="/profileedit" element={<ProfileEdit />} /> */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/tweets" element={<MainTweets />} />
            <Route path="/" element={<MainTweets />} />
          </Routes>
        </div>
        <div className='px-4'>
          <RightSidebar />
        </div>
      </div>
    </>
  );
};
