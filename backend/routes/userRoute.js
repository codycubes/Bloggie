import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  follow,
  unFollow
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/:id').put(protect, updateUserProfile).delete(protect, deleteUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/allusers').get(protect, getAllUsers); // Change to GET and add protect middleware
// router.put("/follow/:id", follow);
// router.put("/unfollow/:id", unFollow);

export default router;
