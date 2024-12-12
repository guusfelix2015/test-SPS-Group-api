const { loadData, saveData } = require('../config/database');
const { randomUUID } = require('crypto');

class UserModel {
  static findById(id) {
    const data = loadData();
    return data.users.find((user) => user.id === id);
  }

  static findByEmail(email) {
    const data = loadData();
    return data.users.find((user) => user.email === email);
  }

  static create(userData) {
    const data = loadData();
    const newUser = {
      ...userData,
      id: randomUUID(),
    };
    data.users.push(newUser);
    saveData(data);
    return newUser;
  }

  static update(id, updates) {
    const data = loadData();
    const user = data.users.find((user) => user.id === id);
    if (!user) return null;

    Object.assign(user, updates);
    saveData(data);
    return user;
  }

  static delete(id) {
    const data = loadData();
    data.users = data.users.filter((user) => user.id !== id);
    saveData(data);
  }

  static findAll() {
    const data = loadData();
    return data.users;
  }
}

module.exports = UserModel;
