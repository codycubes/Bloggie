import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Registration from './Pages/Register';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './Pages/Homepage';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  const pageName:string = location.pathname.split('/')[1];  
  console.log("🚀 ~ pageName:", pageName)
  console.log("🚀 ~ pageName:", pageName)
  return (
    <div>
      {/* Either show navbar using auth or hide using the location as follows */}
      {(pageName !== 'login' && pageName !== 'registration') && <Navbar />}      
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;