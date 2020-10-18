const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const _ = require('underscore');
const validateToken = require('../auth/midleware');

router.get('/', validateToken, async (req, res) => {
  let limit = req.query.limit || 5;
  limit = Number(limit);
  let start = req.query.start || 0;
  start = Number(start);
  try {
    const users = await User.find({ state: true }).skip(start).limit(limit);
    res.json({
      ok: true,
      user: users,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  try {
    const userBD = await user.save();
    res.json({
      ok: true,
      user: userBD,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
});

router.put('/:id', validateToken, async (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['name', 'img', 'role', 'state']);

  try {
    const updatedUser = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
});

router.delete('/:id', validateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );
    res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error,
    });
  }
});

module.exports = router;
