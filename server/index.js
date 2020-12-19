const express = require('express');
const app = express();
const config = require('./config/key')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
  console.log('successfully connected to database')
}).catch((error) => {
  console.error(error)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('successfully connected server-side app')
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
}) 