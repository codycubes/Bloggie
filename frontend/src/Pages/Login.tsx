import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { RootState, AppDispatch } from '../store';
import signin from '../images/Sign in-amico.png';

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [login, { isLoading }] = useLoginMutation<LoginResponse>();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log("🚀 ~ handleLogin ~ res:", res)
      dispatch(setCredentials({ ...res }));
      const isAdmin = res.email.endsWith('@admin.com');
      console.log("🚀 ~ handleLogin ~ isAdmin:", isAdmin)
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl text-center pt-5'>Sign In</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 h-11/12 space-x-10'>
        <div>
          <img src={signin} alt='signin' className='object-cover w-full' />
        </div>
        <div className='flex items-center justify-center'>
          <form className='w-full max-w-md' onSubmit={handleLogin}>
            <input
              type='email'
              placeholder='Email'
              className='border border-gray-300 p-2 w-full my-4'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              placeholder='Password'
              className='border border-gray-300 p-2 w-full my-4'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isLoading && <h2>Loading</h2>}
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md w-full my-5'>
              Sign In
            </button>
            <p className='text-center'>
              Don`t have an account?{' '}
              <Link to='/registration'>
                <span className='text-blue-700 underline'>Register here</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;