const express = require('express');
const sgMail = require('../helpers/sendGridConfig');
const Router = express.Router();

Router.post('/', (req, res) => {
  const to = req.body.to;
  const from = req.body.from;
  const message = req.body.msg;
  const subject = req.body.subject;
  const msg = {
    to,
    from,
    subject,
    html: `<strong>${message}</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.json({
        ok: true,
        message: 'Email sent',
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        ok: false,
        error,
      });
    });
});

module.exports = Router;
