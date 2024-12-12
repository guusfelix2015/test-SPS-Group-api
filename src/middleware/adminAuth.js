const isAdmin = (req, res, next) => {
  if (req.user.type !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Acesso permitido apenas para administradores'
    });
  }
  next();
};

module.exports = isAdmin; 