import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Registration from './Pages/Register';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ProfileEdit from './Pages/ProfileEdit';
// import PrivateRoute from './Components/PrivateRoute';
// import AdminRoute from './Components/AdminRoute';
// import AdminPage from './Pages/AdminPage';
import { Home } from './Pages/Homepage';
// import { Profile } from './Pages/Profile';

const App: React.FC = () => {
  return (
    <div className="bg-black text-white px-10 w-full h-full">
      <Navbar />
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
