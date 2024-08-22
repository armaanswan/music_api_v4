const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
const songRoutes = require('./routes/songs');
const albumRoutes = require('./routes/albums');
const epRoutes = require('./routes/eps');
const artistRoutes = require('./routes/artists');

// Root route
app.get('/', (req, res) => {
    res.render('index');
});

// Use routes
app.use('/songs', songRoutes);
app.use('/albums', albumRoutes);
app.use('/eps', epRoutes);
app.use('/artists', artistRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
