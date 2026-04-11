const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

router.get('/',       ctrl.getPublicPortfolio);           // Public
router.get('/all',    protect, ctrl.getAllPortfolio);      // Admin
router.get('/:id',    ctrl.getPortfolioById);              // Public
router.post('/',      protect, ctrl.createPortfolio);      // Admin
router.put('/:id',    protect, ctrl.updatePortfolio);      // Admin
router.delete('/:id', protect, ctrl.deletePortfolio);      // Admin

module.exports = router;
