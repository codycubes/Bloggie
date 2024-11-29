import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Registration from './Pages/Register';
import { Home } from './Pages/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileEdit from './Pages/ProfileEdit';

const App: React.FC = () => {
  return (
    <div className="bg-black text-white font-poppins px-10 min-h-screen ">
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/*" element={<Home />} />
        {/* <Route path='/profileedit' element={<ProfileEdit />} />  */}
      </Routes>
    </div>
  );
};

export default App;
