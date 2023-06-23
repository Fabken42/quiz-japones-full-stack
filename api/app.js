require('dotenv').config();
require('express-async-errors');
const cookieParser = require('cookie-parser')

const perguntas = require('./routes/perguntas');
const usuario = require('./routes/usuario')
const connectDB = require('./db/connect');
const express = require('express');
const cors = require('cors')
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(cookieParser())
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);


//http://localhost:4200/api/
app.use('/api/perguntas', perguntas)
app.use('/api/usuario',usuario) 


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4200;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start(); 