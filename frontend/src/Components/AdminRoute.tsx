import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminPage from '../Pages/AdminPage'; // Import your AdminPage component

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo && userInfo.email.endsWith('@admin.com')) {
    return <AdminPage />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
