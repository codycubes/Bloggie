import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Registration from './Pages/Register';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Homepage from './Pages/Homepage';
import ProfileEdit from './Pages/ProfileEdit';
import PrivateRoute from './Components/PrivateRoute';
import AdminRoute from './Components/AdminRoute';
import AdminPage from './Pages/AdminPage';
import { Home } from './Pages/Homepage';

const App: React.FC = () => {
  return (
    <div className="bg-black text-white px-10 w-full h-full">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            // <AdminRoute>
              <AdminPage />
            // </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
