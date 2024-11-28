import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export const LeftSidebar: React.FC = () => {
  return (
    <div className='flex flex-col h-full md:h-[90vh] justify-between mr-6'>
        <div className='mt-6 flex flex-col space-y-4'>
            <Link to='/'>
                <div className='flex items-center space-x-6 py-2 hover:bg-slate-300 rounded-full cursor-pointer'> 
                    <HomeIcon fontSize='large'/>
                    <p>Home</p>
                </div>
            </Link>
            <Link to='/profile'>
                <div className='flex items-center space-x-6 py-2 hover:bg-slate-300 rounded-full cursor-pointer'> 
                    <PersonIcon fontSize='large'/>
                    <p>Profile</p>
                </div>
                </Link>
        </div>

        <div className='flex justify-between pb-5'>
            <div>
                <p className='font-bold'>Username</p>
                <p className='font-bold'>@Username</p>
            </div>
            <div>
                <Link to='/signin'>
                    <button className='bg-red-500 text-white px-4 py-2 rounded-full'>Sign Out</button>
                </Link>
            </div>

        </div>

    </div>
  )
}