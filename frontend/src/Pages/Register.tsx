import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { SquareLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { RootState } from '../store'; 

const Registration: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex items-center font-raleway justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg">
        <h2 className="text-7xl my-10  font-black text-center">Register</h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block text-sm font-bold">Full Names</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-bold">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-bold">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div>

            {isLoading && <SquareLoader />}
            <button
              type="submit"
              className="flex justify-center w-full px-4 mb-8 py-2 font-bold text-white bg-red-700 border border-transparent rounded-full shadow-sm hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Register
            </button>
            <div className='justify-center items-center text-center'>
            <p>Already have an account? <Link to="/login" className='underline font-bold'>Login</Link></p>
            </div>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
