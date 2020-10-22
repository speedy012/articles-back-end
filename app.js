const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(morgan('common'));
app.use(helmet());

//import routes
const articlesRoute = require('./routes/articles');

app.use(bodyParser.json());
app.use(cors());
app.use('/articles', articlesRoute);

//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected')
);

app.listen(3000);
