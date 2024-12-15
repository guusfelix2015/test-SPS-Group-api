const express = require('express');
const router = express.Router();
const createContainer = require('../config/container');
const authenticateToken = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const userSchemas = require('../schemas/userSchema');

const { userController } = createContainer();

router.post('/login', validateRequest(userSchemas.login), (req, res) =>
  userController.login(req, res)
);

router.post(
  '/',
  authenticateToken,
  validateRequest(userSchemas.create),
  (req, res) => userController.create(req, res)
);

router.get('/', authenticateToken, (req, res) =>
  userController.getAll(req, res)
);

router.get('/me', authenticateToken, (req, res) =>
  userController.getCurrentUser(req, res)
);

router.get('/:id', authenticateToken, (req, res) =>
  userController.getById(req, res)
);

router.put(
  '/:id',
  authenticateToken,
  validateRequest(userSchemas.update),
  (req, res) => userController.update(req, res)
);

router.delete('/:id', authenticateToken, (req, res) =>
  userController.delete(req, res)
);

module.exports = router;
