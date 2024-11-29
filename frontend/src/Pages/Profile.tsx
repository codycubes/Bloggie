import React, { useState } from 'react';
import { useAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation, useRegisterMutation } from '../slices/usersApiSlice';

interface User {
  _id: string;
  name: string;
  email: string;
}

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'AllUsers' | 'AllPosts'>('AllUsers');
  const { data: users = [], error, isLoading } = useAllUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [register] = useRegisterMutation();

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('');

  const handleAddUser = async () => {
    if (newUserPassword !== newUserConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await register({ name: newUserName, email: newUserEmail, password: newUserPassword }).unwrap();
      alert('User added successfully');
      setShowAddUserModal(false);
    } catch (err) {
      console.error('Failed to add user', err);
      alert('Failed to add user');
    }
  };

  const handleUpdate = async (user: User) => {
    const updatedName = prompt('Enter new name:', user.name);
    if (updatedName) {
      try {
        await updateUser({ _id: user._id, name: updatedName }).unwrap();
        alert('User updated successfully');
      } catch (err) {
        console.error('Failed to update user', err);
        alert('Failed to update user');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        alert('User deleted successfully');
      } catch (err) {
        console.error('Failed to delete user', err);
        alert('Failed to delete user');
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'AllUsers':
        return (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">All Users</h2>
            {/* <button onClick={() => setShowAddUserModal(true)} className="bg-green-500 text-white px-3 py-1 rounded mb-4">Add User</button> */}
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Failed to fetch users</p>
            ) : (
              users.length > 0 ? (
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li
                      key={user._id}
                      className="p-2 border rounded flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                          onClick={() => handleUpdate(user)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No users found.</p>
              )
            )}
          </div>
        );
      case 'AllPosts':
        return (
          <div className="bg-white p-4 rounded shadow">
            <p>This is the All Posts tab content.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      <header className="bg-black h-[300px] flex items-center justify-center">
        <img src="path-to-header-image.jpg" alt="Header" className="w-full h-full object-cover" />
      </header>

      <div className="max-w-4xl mx-auto p-4 text-black">
        <div className="flex">
          <div className="flex items-center space-x-4">
            <img src="vite.svg" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white -mt-12" />
            <div>
              <h1 className="text-2xl font-bold">Administrator</h1>
              <p className="text-gray-600">@Admin</p>
            </div>
          </div>
          <button onClick={() => setShowAddUserModal(true)} 
          className="ml-auto bg-blue-500 px-4 py-2 rounded">Add User</button>
        </div>
        <div className="mt-6">
          <ul className="flex space-x-4 border-b">
            <li
              className={`pb-2 cursor-pointer ${activeTab === 'AllUsers' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab('AllUsers')}
            >
              All Users
            </li>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <div>
              <label htmlFor="newUserName" className="block text-sm font-bold">Name</label>
              <input
                id="newUserName"
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="newUserEmail" className="block text-sm font-bold">Email</label>
              <input
                id="newUserEmail"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="newUserPassword" className="block text-sm font-bold">Password</label>
              <input
                id="newUserPassword"
                type="password"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="newUserConfirmPassword" className="block text-sm font-bold">Confirm Password</label>
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
              <button onClick={handleAddUser} className="px-4 py-2 bg-green-500 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


