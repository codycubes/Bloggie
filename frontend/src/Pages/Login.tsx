import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { RootState, AppDispatch } from '../store';
import signin from '../images/Sign in-amico.png';
import spaceImage from '../images/space.jpg';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.data?.message || err.error,
      });
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='w-1/4 bg-cover' style={{ backgroundImage: `url(${spaceImage})` }}></div>
      <div className='w-3/4 bg-white text-black flex items-center justify-center relative'>
        <div className='absolute left-0 top-0 w-1/4 h-full bg-cover' style={{ backgroundImage: `url(${spaceImage})`, zIndex: -1 }}></div>
        <form className='w-full max-w-md p-10 bg-white z-10' onSubmit={handleLogin}>
          <h1 className='text-8xl text-center mb-5 text-black font-bold'>Sign In</h1>
          <input
            type='email'
            placeholder='Email'
            className='border text-black border-gray-300 p-3 w-full my-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='relative w-full my-4'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='border text-black border-gray-300 p-3 w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {isLoading && <ClipLoader color={"#123abc"} loading={isLoading} size={50} />}
          <button type='submit' className='bg-black text-white p-3 rounded-lg w-full my-5'>
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
  );
};

export default Login;