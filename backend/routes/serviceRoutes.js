const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',       ctrl.getPublicServices);           // Public
router.get('/all',    protect, ctrl.getAllServices);      // Admin
router.post('/',      protect, ctrl.createService);       // Admin
router.put('/:id',    protect, ctrl.updateService);       // Admin
router.delete('/:id', protect, ctrl.deleteService);       // Admin

module.exports = router;
