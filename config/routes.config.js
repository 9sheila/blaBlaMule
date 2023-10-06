const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const travelController = require('../controllers/travel.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/storage.config');

// misc
router.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to the API' });
});

// auth
router.post('/register', upload.single('profilePicture'), authController.register);
router.post('/login', authController.login);

// users
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);

// travels
router.get('/travelsList', authMiddleware.isAuthenticated, travelController.getTravels)

module.exports = router;