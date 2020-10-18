require('./config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const validateToken = require('./auth/midleware');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//calling the routes
app.use(require('./routes'));

//conecting to the database
const run = async () => {
  await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  console.log('Successfull conection');
};

run().catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(`Escuchando el puerto ${process.env.PORT}`);
});
