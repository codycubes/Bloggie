import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { SquareLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import signup from '../images/Sign up-pana.png';
import spaceImage from '../images/space.jpg';
import { RootState } from '../store';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Registration: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match',
      });
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err: any) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err?.data?.message || err.error,
        });
      }
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='w-1/4 bg-cover' style={{ backgroundImage: `url(${spaceImage})` }}></div>
      <div className='w-3/4 text-black bg-white flex items-center justify-center relative'>
        <div className='absolute left-0 top-0 w-1/4 h-full bg-cover' style={{ backgroundImage: `url(${spaceImage})`, zIndex: -1 }}></div>
        <form className='w-full max-w-md p-10 bg-white z-10' onSubmit={handleRegister}>
          <h1 className='text-4xl text-center mb-5 font-bold'>Register</h1>
          <input
            type='text'
            placeholder='Name'
            className='border border-gray-300 p-3 w-full my-4'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type='email'
            placeholder='Email'
            className='border border-gray-300 p-3 w-full my-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='relative w-full my-4'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='border border-gray-300 p-3 w-full'
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
          <div className='relative w-full my-4'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              className='border border-gray-300 p-3 w-full'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {isLoading && <SquareLoader />}
          <button type='submit' className='bg-black text-white p-3 rounded-lg w-full my-5'>
            Register
          </button>
          <p className='text-center'>
            Already registered?{' '}
            <Link to='/login'>
              <span className='text-blue-700 underline'>Sign in here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;