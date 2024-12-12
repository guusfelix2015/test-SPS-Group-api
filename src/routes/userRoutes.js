const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/adminAuth');
const validateRequest = require('../middleware/validateRequest');
const userSchemas = require('../schemas/userSchema');

router.post('/login', validateRequest(userSchemas.login), UserController.login);
router.post(
  '/',
  authenticateToken,
  validateRequest(userSchemas.create),
  UserController.create
);
router.put(
  '/:id',
  authenticateToken,
  validateRequest(userSchemas.update),
  UserController.update
);
router.delete('/:id', authenticateToken, UserController.delete);
router.get('/', authenticateToken, UserController.getAll);
router.get('/me', authenticateToken, UserController.getMe);

module.exports = router;
