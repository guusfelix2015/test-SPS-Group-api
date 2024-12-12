const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/database');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(401).json({
      status: 'error',
      message: 'Token não fornecido'
    });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Formato de token inválido'
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: 'error',
        message: 'Token inválido'
      });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken; 