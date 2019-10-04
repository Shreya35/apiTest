const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const testRouter = require('./Router/testRouter')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

mongoose.connect('mongodb://localhost/ApiTest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use('/test',testRouter)

app.listen('4100',()=>{
    console.log('Lisenting on port no 4100')
})