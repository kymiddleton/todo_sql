// Dependencies
const express = require('express');
const path = require('path'); // Is path needed for SQL?
const bodyParser = require('body-parser'); 
const Sequelize = require('sequelize'); //Should this be here or in the models index.js?

// Initialize Express
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Sets the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
const db = require("./models");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets the server to use the public directory for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/api-routes.js')(app);

require('./routes/html-routes.js')(app);

// Socket.io Routes
require('./sockets/todo-sockets')(io);



// Starts the server to begin listening
db.sequelize.sync({ force: false }).then(function () {
    server.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
}); 