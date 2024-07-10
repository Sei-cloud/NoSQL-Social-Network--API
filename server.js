// importing express
const express = require('express');
// importing our db from connection.js
const db = require('./config/connection');
// importing our routes
const routes = require('./routes');

// Port
const PORT = 3001;
// defining express as our app variable
const app = express();

// accepting url encoded and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Handle routes with express
app.use(routes);

// Start the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});