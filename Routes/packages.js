const express = require('express');
const router = express.Router();
const packages = require('../data/packages.json');
const fs = require('fs');
const path = require('path');

// Helper function to save data
function saveData(data, filePath) {
  fs.writeFileSync(path.join(__dirname, '..', 'data', filePath), JSON.stringify(data, null, 2));
}

// GET all packages
router.get('/', (req, res) => {
  res.json(packages);
});

// GET package by ID
router.get('/:id', (req, res) => {
  const pkg = packages.find(p => p.id === parseInt(req.params.id));
  if (!pkg) return res.status(404).send('Package not found');
  res.json(pkg);
});

// POST a new package
router.post('/', (req, res) => {
  const newPackage = {
    id: packages.length + 1,
    destinationId: req.body.destinationId,
    name: req.body.name,
    price: req.body.price
  };
  packages.push(newPackage);
  saveData(packages, 'packages.json');
  res.status(201).json(newPackage);
});

// PUT (update) a package
router.put('/:id', (req, res) => {
  const pkg = packages.find(p => p.id === parseInt(req.params.id));
  if (!pkg) return res.status(404).send('Package not found');

  pkg.destinationId = req.body.destinationId;
  pkg.name = req.body.name;
  pkg.price = req.body.price;
  saveData(packages, 'packages.json');
  res.json(pkg);
});

// DELETE a package
router.delete('/:id', (req, res) => {
  const packageIndex = packages.findIndex(p => p.id === parseInt(req.params.id));
  if (packageIndex === -1) return res.status(404).send('Package not found');

  packages.splice(packageIndex, 1);
  saveData(packages, 'packages.json');
  res.status(204).send();
});

module.exports = router;