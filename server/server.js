require('./config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (body.name === undefined) {
    res.status(400).json({
      message: 'Fuck you',
    });
  } else {
    res.json({
      body,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Escuchando el puerto ${process.env.PORT}`);
});
