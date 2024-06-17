const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const destinationsRoutes = require('./routes/destinations');
const packagesRoutes = require('./routes/packages');
const bookingsRoutes = require('./routes/bookings');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/destinations', destinationsRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/bookings', bookingsRoutes);

// Serve static files
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');

// Render a view for the current state of the API's data
app.get('/', (req, res) => {
  const destinations = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'destinations.json')));
  res.render('index', { destinations });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});