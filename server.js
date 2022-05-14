'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const { join } = require("path");
const fs = require('fs');
const app = express();
const http = require("http").Server(app)
const routes = './app/routes/routes.js'
require('dotenv').config()

app.use(bodyParser.json()); // allow send and response json in req
app.use(bodyParser.urlencoded({extended : true})); // allow use of form vairable for sending data

require('./app/routes/routes')(app)
const models = join(__dirname, './app/models');

fs.readdirSync(models) // sequalize los models and connect with files .js and the folder path
    .filter(file => ~file.search(/^[6\.].*\.js$/))
    .forEach(file => require(join(models, file)))

http.listen(process.env.PORT, () => {
    console.log('servidor corriendo en port =', process.env.PORT);
})

process.on('uncaughtException', function (err) {
    console.log(err);
})

// app.use('/api/v1', require('./app/routes/routes'))

module.exports = app
