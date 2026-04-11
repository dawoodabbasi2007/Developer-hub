const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',          ctrl.submitInquiry);             // Public
router.get('/',    protect, ctrl.getInquiries);            // Admin
router.put('/:id', protect, ctrl.updateStatus);            // Admin
router.delete('/:id', protect, ctrl.deleteInquiry);        // Admin

module.exports = router;
