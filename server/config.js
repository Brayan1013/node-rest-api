//====================
//PORT
//====================

process.env.PORT = process.env.PORT || 3000;

//======
//SECRET
//======

process.env.SECRET = 'secret';

///checking the environment

let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.DATABASE = 'mongodb://localhost:2000/cafe';
  console.log('WE ARE IN DEVELPMENT');
} else {
  process.env.DATABASE = `mongodb+srv://brayan123:12345@cluster0.koskc.mongodb.net/cafe?retryWrites=true&w=majority`;
  console.log('WE ARE IN PRODUCTION');
}
