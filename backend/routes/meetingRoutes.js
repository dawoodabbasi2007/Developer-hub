const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/meetingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',          ctrl.bookMeeting);               // Public
router.get('/',    protect, ctrl.getMeetings);             // Admin
router.put('/:id', protect, ctrl.updateStatus);            // Admin
router.delete('/:id', protect, ctrl.deleteMeeting);        // Admin

module.exports = router;
