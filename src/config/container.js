const UserService = require('../services/UserService');
const UserController = require('../controllers/userController');
const JsonUserRepository = require('../repositories/JsonUserRepository');

const createContainer = () => {
  const userRepository = new JsonUserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  return {
    userController,
  };
};

module.exports = createContainer;
