import express from 'express';
import { authUser,registerUser,logoutUser,getUserProfile,updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/imageUploadMiddleware.js';

const router  = express.Router();   

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
//instead of writing router.get('/profile') and router.put('/porfile')
router.route('/profile').get(protect, getUserProfile).put(protect, upload.single('profileImage'), updateUserProfile); 

export default router;