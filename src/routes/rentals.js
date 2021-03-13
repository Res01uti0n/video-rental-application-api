const express = require('express');
const { getRentalsList, createNewRental, getRental } = require('../controllers/rentals');

const router = express.Router();

router.get('/', getRentalsList);

router.post('/', createNewRental);

router.get('/:id', getRental);

module.exports = router;
