const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const usersController = require('../controllers/users.controller');
const travelController = require('../controllers/travel.controller')
const reviewsController = require('../controllers/reviews.controller')
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
router.get('/users/detail/:id', authMiddleware.isAuthenticated, usersController.getUser)

// travels
router.get('/travelsList', authMiddleware.isAuthenticated, travelController.getTravels)
router.get('/travels/details/:id', authMiddleware.isAuthenticated, travelController.getTravelsDetails)

// reviews
router.get('/review/list/:id', authMiddleware.isAuthenticated, reviewsController.listReviews);
router.post('/review/create', authMiddleware.isAuthenticated, reviewsController.createReviews);
router.delete('/review/delete/:id', authMiddleware.isAuthenticated, reviewsController.deleteReviews);

// /* request */
// router.get('/requests', authMiddleware.isAuthenticated, requestController.getRequests);
// router.patch('/request/edit/:id', authMiddleware.isAuthenticated, friendRequestController.respondToFriendRequest);
// router.get('/friends', authMiddleware.isAuthenticated, friendRequestController.getFriends);
// router.get('/friend-requests/pending', authMiddleware.isAuthenticated, friendRequestController.getPendingFriendRequests);
// router.delete('/friend-request/delete/:id', authMiddleware.isAuthenticated, friendRequestController.cancelFriendRequest);
// router.post('/friend-request/:id', authMiddleware.isAuthenticated, friendRequestController.sendFriendRequest);

module.exports = router;