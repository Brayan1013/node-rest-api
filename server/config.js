//====================
//PORT
//====================

process.env.PORT = process.env.PORT || 3000;

//======
//SECRET
//======

process.env.SECRET = 'secret';

///checking the environment

const env = process.env.NODE_ENV || 'production';

if (env === 'production') {
  process.env.DATABASE = 'mongodb://localhost:2000/cafe';
} else {
  process.env.DATABASE = `mongodb+srv://brayan123:12345@cluster0.koskc.mongodb.net/cafe?retryWrites=true&w=majority`;
}
