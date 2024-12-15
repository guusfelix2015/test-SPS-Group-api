const { loadData, saveData } = require('../config/database');
const User = require('../models/userModel');
const IUserRepository = require('./IUserRepository');
const { randomUUID } = require('crypto');

class JsonUserRepository extends IUserRepository {
  async findById(id) {
    const data = loadData();
    const user = data.users.find((u) => u.id === id);
    return user
      ? new User(user.id, user.name, user.email, user.password, user.type)
      : null;
  }

  async findByEmail(email) {
    const data = loadData();
    const user = data.users.find((u) => u.email === email);
    return user
      ? new User(user.id, user.name, user.email, user.password, user.type)
      : null;
  }

  async create(userData) {
    const data = loadData();
    const user = new User(
      randomUUID(),
      userData.name,
      userData.email,
      userData.password,
      userData.type
    );

    data.users.push({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type,
    });

    saveData(data);
    return user;
  }

  async findAll() {
    const data = loadData();
    return data.users.map(
      (u) => new User(u.id, u.name, u.email, u.password, u.type)
    );
  }

  async update(id, userData) {
    const data = loadData();
    const index = data.users.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    const updatedUser = {
      ...data.users[index],
      ...userData,
    };

    data.users[index] = updatedUser;
    saveData(data);

    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.password,
      updatedUser.type
    );
  }

  async delete(id) {
    const data = loadData();
    data.users = data.users.filter((u) => u.id !== id);
    saveData(data);
  }
}

module.exports = JsonUserRepository;
