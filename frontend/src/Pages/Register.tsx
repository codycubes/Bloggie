import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { SquareLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import signup from '../images/Sign up-pana.png';
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
    <div className='container mx-auto px-4'>
      <h1 className='text-4xl text-center pt-5'>Register</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 h-11/12 space-x-10'>
        <div>
          <img src={signup} alt='signup' className='object-cover w-full' />
        </div>
        <div className='flex items-center justify-center'>
          <form className='w-full max-w-md' onSubmit={handleRegister}>
            <input
              type='text'
              placeholder='Name'
              className='border border-gray-300 p-2 w-full my-4'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <input
              type='password'
              placeholder='Confirm Password'
              className='border border-gray-300 p-2 w-full my-4'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {isLoading && <SquareLoader />}
            <button type='submit' className='bg-blue-500 text-white p-2 rounded-md w-full my-5'>
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
    </div>
  );
};

export default Registration;