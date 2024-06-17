const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const bookingsFilePath = path.join(__dirname, '..', 'data', 'bookings.json');
let bookings = require(bookingsFilePath);

// Helper function to save data
function saveData(data) {
  fs.writeFileSync(bookingsFilePath, JSON.stringify(data, null, 2));
}

// GET all bookings
router.get('/', (req, res) => {
  res.json(bookings);
});

// GET booking by ID
router.get('/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).send('Booking not found');
  res.json(booking);
});

// POST a new booking
router.post('/', (req, res) => {
  const newBooking = {
    id: bookings.length + 1,
    packageId: req.body.packageId,
    customerName: req.body.customerName,
    date: req.body.date
  };
  bookings.push(newBooking);
  saveData(bookings);
  res.status(201).json(newBooking);
});

// PUT (update) a booking
router.put('/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) return res.status(404).send('Booking not found');

  booking.packageId = req.body.packageId;
  booking.customerName = req.body.customerName;
  booking.date = req.body.date;
  saveData(bookings);
  res.json(booking);
});

// DELETE a booking
router.delete('/:id', (req, res) => {
  const bookingIndex = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (bookingIndex === -1) return res.status(404).send('Booking not found');

  bookings.splice(bookingIndex, 1);
  saveData(bookings);
  res.status(204).send();
});

module.exports = router;