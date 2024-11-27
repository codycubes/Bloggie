import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { RootState, AppDispatch } from '../store'; 
// import Loader from '../Components/Loader';
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

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    // console.log(err?.data?.message || err.error)
    }
  };

  return (
    <div className="flex  font-raleway items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg mt-20 shadow-lg">
        <h2 className="text-7xl font-black text-center">Login To Podify</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div> 
            <label htmlFor="email" className="block text-sm font-bold">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-transparent w-full px-3 text-white py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
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
              className="block w-full bg-transparent px-3 py-2 text-white mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
{ isLoading && <h2>Loading</h2>}

            <button
              type="submit"
              className="flex justify-center w-full px-4 mb-8 py-2 font-bold text-white bg-red-700 border border-transparent rounded-full shadow-sm hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in
            </button>
            <div className="flex items-center justify-center text-center gap-1">
              <p>Don't have an account?</p>   
              <Link className="underline font-bold" to="/registration">
                Sign Up here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
