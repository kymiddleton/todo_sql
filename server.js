// Dependencies
const express = require('express');
const path = require('path'); // Is path needed for SQL?
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const Sequelize = require('sequelize');

// Initialize Express
const app = express();

// Sets the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
const db = require("./app/models");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets the server to use the public directory for static assets
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("app/public"));

// Routes
require('./routes/api-routes.js')(app);
// require("./app/routes/api-routes.js")(app);

require('./routes/html-routes.js')(app);
// require("./app/routes/html-routes.js")(app);

// sequelize initialization
const sequelize = new Sequelize("postgres://username:password@localhost:5432/dbname");

// Starts the server to begin listening
db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
}); 