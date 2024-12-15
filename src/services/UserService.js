const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/database');

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || user.password !== password) {
      throw new Error('Email ou senha inválidos');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, type: user.type },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: user.toJSON(),
    };
  }

  async getCurrentUser(userId) {
    return this.userRepository.findById(userId);
  }

  async createUser(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    return this.userRepository.create(userData);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async update(id, data) {
    return this.userRepository.update(id, data);
  }

  async delete(id) {
    return this.userRepository.delete(id);
  }
}

module.exports = UserService;
