require('dotenv').config();

const express = require('express');
const connectDB = require('./database/database');
const cryptoRoutes = require('./routes/cryptoRoutes');
const fetchCryptoData = require('./jobs/fetchCryptoData');
const cron = require('node-cron');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api', cryptoRoutes);

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


