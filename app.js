const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./data/users.js');
const bookRoute = require('./data/books.js');
require('dotenv').config()

// MongoDB Databse url
var mongoDatabase = process.env.MONGODB_URI || 'mongodb://localhost:27017/library';

// Created express server
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDatabase, {useUnifiedTopology: true, useNewUrlParser: true}).then(
 () => { console.log('Database is connected') },
 err => { console.log('There is problem while connecting database ' + err) }
);

// Convert incoming data to JSON format
app.use(bodyParser.json());


app.use(express.static(`./dist/library-app`)); 


// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 8080;

// Routes Configuration
app.use('/api/users', userRoute);
app.use('/api/books', bookRoute);

// Staring our express server
const server = app.listen(port, function () {
 console.log('Server Lisening On Port : ' + port);
});


app.get('/*', function (req, res){
    res.sendFile(path.join(__dirname + '/dist/library-app/index.html'));
})