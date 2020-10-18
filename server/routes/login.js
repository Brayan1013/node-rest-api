const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

Router.post('/', async (req, res) => {
  const response = await User.findOne({ name: req.body.name }).exec();

  if (response === null) {
    return res.status(400).json({
      ok: false,
      message: 'User or password is incorrt',
    });
  }

  const responseValidation = bcrypt.compareSync(
    req.body.password,
    response.password
  );

  if (responseValidation === false) {
    return res.status(400).json({
      ok: false,
      message: 'User or password is incorrt',
    });
  }

  const token = jwt.sign(
    {
      data: response,
    },
    'secret',
    { expiresIn: '1h' }
  );

  res.json({
    ok: true,
    token,
  });
});

module.exports = Router;
