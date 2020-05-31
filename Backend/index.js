const express = require('express');
const Route = require('./route.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const Config = require('./Config');

const port = Config.port;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', Route)


mongoose.connect(Config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;  

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
