const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { SECRET_KEY } = require('../config/database');

class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = UserModel.findByEmail(email);

      if (!user || user.password !== password) {
        return res.status(401).json({
          status: 'error',
          message: 'Credenciais inválidas',
        });
      }

      const token = jwt.sign(
        { email: user.email, type: user.type },
        SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );

      res.json({
        status: 'success',
        data: { token },
      });
    } catch (_error) {
      res.status(500).json({
        status: 'error',
        message: `Erro interno do servidor ${_error}`,
      });
    }
  }

  static async create(req, res) {
    try {
      const { email, name, type, password } = req.body;

      if (UserModel.findByEmail(email)) {
        return res.status(400).json({
          status: 'error',
          message: 'Email já existe',
        });
      }

      const newUser = UserModel.create({ email, name, type, password });

      res.status(201).json({
        status: 'success',
        message: 'Usuário criado com sucesso',
        data: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          type: newUser.type,
        },
      });
    } catch (_error) {
      res.status(500).json({
        status: 'error',
        message: `Erro interno do servidor ${_error}`,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedUser = UserModel.update(id, updates);
      if (!updatedUser) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuário não encontrado',
        });
      }

      res.json({
        status: 'success',
        message: 'Usuário atualizado com sucesso',
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          type: updatedUser.type,
        },
      });
    } catch (_error) {
      res.status(500).json({
        status: 'error',
        message: `Erro interno do servidor ${_error}`,
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = UserModel.findById(id);

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuário não encontrado',
        });
      }

      UserModel.delete(id);

      res.json({
        status: 'success',
        message: 'Usuário removido com sucesso',
      });
    } catch (_error) {
      res.status(500).json({
        status: 'error',
        message: `Erro interno do servidor ${_error}`,
      });
    }
  }

  static async getAll(req, res) {
    try {
      const users = UserModel.findAll();
      res.json({
        status: 'success',
        data: users.map((user) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type,
          password: user.password,
        })),
      });
    } catch (_error) {
      res.status(500).json({
        status: 'error',
        message: `Erro interno do servidor ${_error}`,
      });
    }
  }

  static async getMe(req, res) {
    try {
      const user = UserModel.findByEmail(req.user.email);

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuário não encontrado',
        });
      }

      res.json({
        status: 'success',
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type,
        },
      });
    } catch (_error) {
      res.status(500).json({
        status: 'error',
        message: `Erro interno do servidor ${_error}`,
      });
    }
  }
}

module.exports = UserController;
