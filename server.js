// Dependencies //
require ('dotenv').config(); // .env variables
const {PORT = 3000, MONGODB_URL} = process.env; // PORT and MONGODB_URL import
const express = require('express'); // Express
const app = express(); // App object
const mongoose = require('mongoose'); // Mongoose import
const cors = require('cors'); // Middleware import
const morgan = require('morgan') // Middleware import

// Database connection //
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
// Connection events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + 'is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnecte4d'));

// Model //
const astroSchema = new mongoose.Schema({
    night: String,
    img: String,
    description: String,
});

const astro = mongoose.model("astro", astroSchema);

// Middleware //
app.use(cors()); // To prevent cors errors, open access to all origins
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse json bodies

// Routes //
//Test
app.get('/', (req, res) => {
    res.send('This is a test! Did it pass?');
});

// Listener
app.listen(PORT, () => console.log("I'm listening on PORT " + PORT + "!"));
