import React, { useState } from 'react';
import { useUpdateUserMutation, useDeleteUserMutation, useRegisterMutation } from '../slices/usersApiSlice';
import AllTweets from '../Components/AllTweets';
import { useDispatch, useSelector } from 'react-redux';
import image from '../images/space.jpg'



interface User {
  _id: string;
  name: string;
  email: string;
}

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'AllPosts'>('AllPosts');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('');

  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Handle the "Edit profile" button click
  const handleEditProfile = () => {
    setNewUserName(userInfo.name);
    setNewUserEmail(userInfo.email);
    setShowAddUserModal(true);
  };

  const renderContent = () => (
    <div className="p-4 rounded shadow">
      <AllTweets />
    </div>
  );

  return (
    <div className="h-full">
      <header className="bg-gray-400 h-[300px] flex items-center justify-center">
        <img src={image} alt="Header" className="w-full h-full object-cover" />
      </header>

      <div className="max-w-4xl mx-auto p-4 text-white">
        <div className="flex">
          <div className="flex items-center space-x-4">
            <img src="vite.svg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white -mt-12" />
            <div>
              <h1 className="text-2xl font-bold">{userInfo.name}</h1>
              <p className="text-gray-600">@{userInfo.name}</p>
            </div>
          </div>
          <button onClick={handleEditProfile} className="ml-auto bg-green-500 px-4 py-2 rounded">Edit profile</button>
        </div>

        <div className='flex flex-col gap-7  border-slate-300 ml-5 mt-7'>
                <div className=''>
                    <p className='mt-2'>Bio goes here</p>
                </div>
                <div className='flex gap-10'>
                    <p className='font-semibold '>52 Followers</p>
                    <p className='font-semibold '>10 Following</p>
                </div>
            </div>

        <div className="mt-6">
          <ul className="flex space-x-4 border-b">
            <li
              className={`pb-2 cursor-pointer ${activeTab === 'AllPosts' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('AllPosts')}
            >
              All Posts
            </li>
          </ul>
          <div className="mt-4">
            {renderContent()}
          </div>
        </div>
      </div>
      {showAddUserModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="text-black p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div>
              <label htmlFor="newUserName" className="block text-sm text-white font-bold">Name</label>
              <input
                id="newUserName"
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="newUserEmail" className="block text-white text-sm font-bold">Email</label>
              <input
                id="newUserEmail"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="newUserPassword" className="block text-white text-sm font-bold">Password</label>
              <input
                id="newUserPassword"
                type="password"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="newUserConfirmPassword" className="block text-sm text-white font-bold">Confirm Password</label>
              <input
                id="newUserConfirmPassword"
                type="password"
                value={newUserConfirmPassword}
                onChange={(e) => setNewUserConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setShowAddUserModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              <button className="px-4 py-2 bg-green-500 text-white rounded">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
