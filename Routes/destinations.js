const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const destinationsFilePath = path.join(__dirname, '..', 'data', 'destinations.json');
let destinations = require(destinationsFilePath);

// Helper function to save data
function saveData(data) {
  fs.writeFileSync(destinationsFilePath, JSON.stringify(data, null, 2));
}

// GET all destinations
router.get('/', (req, res) => {
  res.json(destinations);
});

// GET destination by ID
router.get('/:id', (req, res) => {
  const destination = destinations.find(d => d.id === parseInt(req.params.id));
  if (!destination) return res.status(404).send('Destination not found');
  res.json(destination);
});

// POST a new destination
router.post('/', (req, res) => {
  const newDestination = {
    id: destinations.length + 1,
    name: req.body.name,
    description: req.body.description,
    country: req.body.country
  };
  destinations.push(newDestination);
  saveData(destinations);
  res.status(201).json(newDestination);
});

// PUT (update) a destination
router.put('/:id', (req, res) => {
  const destination = destinations.find(d => d.id === parseInt(req.params.id));
  if (!destination) return res.status(404).send('Destination not found');

  destination.name = req.body.name;
  destination.description = req.body.description;
  destination.country = req.body.country;
  saveData(destinations);
  res.json(destination);
});

// DELETE a destination
router.delete('/:id', (req, res) => {
  const destinationIndex = destinations.findIndex(d => d.id === parseInt(req.params.id));
  if (destinationIndex === -1) return res.status(404).send('Destination not found');

  destinations.splice(destinationIndex, 1);
  saveData(destinations);
  res.status(204).send();
});

// Filter destinations by country
router.get('/filter/:country', (req, res) => {
  const filteredDestinations = destinations.filter(d => d.country.toLowerCase() === req.params.country.toLowerCase());
  res.json(filteredDestinations);
});

module.exports = router;