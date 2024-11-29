import React, { useState, useEffect, useRef } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

export const LeftSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { userInfo } = useTypedSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col fixed h-full md:h-[90vh] justify-between'>
      <div className='mt-6 flex flex-col space-y-4'>
        <h1 className='font-oswald mb-10 text-5xl'>Bloggeat</h1>
        <Link to='/'>
          <div className='flex items-center space-x-4 w-full py-2 hover:bg-slate-300 rounded-full cursor-pointer'>
            <HomeIcon fontSize='large' className='text-green-500' />
            <p>Home</p>
          </div>
        </Link>
        <Link to='/profile'>
          <div className='flex items-center space-x-4 py-2 hover:bg-slate-300 rounded-full cursor-pointer'>
            <PersonIcon className='text-green-500' fontSize='large' />
            <p>Profile</p>
          </div>
        </Link>
      </div>

      <div className='flex justify-between pb-5'>
        {userInfo ? (
          <>
            <div>
              <h1 className='font-bold text-xl pb-4'>@{userInfo.name}</h1>
              <button
                onClick={logoutHandler}
                className='bg-green-500 text-white px-4 py-2 rounded-full mt-2'
              >
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className='flex gap-10'>
            <Link to='/registration'>
              <button className='bg-green-500 text-white px-4 py-2 rounded-full mb-2'>
                Sign Up
              </button>
            </Link>
            <Link to='/login'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-full'>
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
