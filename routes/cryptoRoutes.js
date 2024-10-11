const express = require('express');
const { getStats, getDeviation } = require('../controllers/cryptoController');

const router = express.Router();

// Route for getting the latest stats of a coin
router.get('/stats', getStats);

// Route for getting the standard deviation of the last 100 prices
router.get('/deviation', getDeviation);

module.exports = router;
