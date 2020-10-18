require('../config');
const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.header('Authorization');

  try {
    const decode = jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Invalid token',
    });
  }
};

module.exports = validateToken;
