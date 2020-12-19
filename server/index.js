const express = require('express');
const app = express();
const config = require('./config/key')
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
  console.log('successfully connected to database')
}).catch((error) => {
  console.error(error)
})

app.get('/', (req, res) => {
  res.send('successfully connected server-side app')
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
}) 