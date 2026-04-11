const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',       ctrl.getPublishedBlogs);            // Public
router.get('/all',    protect, ctrl.getAllBlogs);          // Admin
router.get('/:id',    ctrl.getBlogById);                   // Public
router.post('/',      protect, ctrl.createBlog);           // Admin
router.put('/:id',    protect, ctrl.updateBlog);           // Admin
router.delete('/:id', protect, ctrl.deleteBlog);           // Admin

module.exports = router;
