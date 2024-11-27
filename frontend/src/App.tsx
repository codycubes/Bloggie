import { Route, Routes } from 'react-router-dom';
// import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import Registration from './Pages/Register';
import Navbar from './Components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ProfileEdit from './Pages/ProfileEdit';
import PrivateRoute from './Components/PrivateRoute';
// import ViewPodcast from './Pages/ViewPodcast';
// import CreatePodcast from './Pages/CreatePodcast';
import Homepage from './Pages/Homepage';
import ProfileEdit from './Pages/ProfileEdit';


const App: React.FC = () => {
  return (
    <div className="bg-black text-white px-10 w-full h-full">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* <Route path="/podcast/:_id" element={<ViewPodcast />}/> */}
        {/* <Route path='/createpodcast' element={<CreatePodcast />}/> */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
