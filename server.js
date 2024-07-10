const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Port
const PORT = 3001;
// Defining exress
const app = express();

// Accepting url encoded and json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use express to handle routes
app.use(routes);

// Start the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});