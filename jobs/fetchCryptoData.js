const axios = require('axios');
const CryptoData = require('../models/CryptoData');

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: 'bitcoin,ethereum,matic-network',
          vs_currencies: 'usd',
          include_market_cap: 'true',
          include_24hr_change: 'true',
        },
      }
    );

    const { bitcoin, ethereum, 'matic-network': matic } = response.data;

    const coins = [
      { name: 'bitcoin', data: bitcoin },
      { name: 'ethereum', data: ethereum },
      { name: 'matic', data: matic },
    ];

    for (const coin of coins) {
      await CryptoData.create({
        coin: coin.name,
        price: coin.data.usd,
        marketCap: coin.data.usd_market_cap,
        change24h: coin.data.usd_24h_change,
      });
    }

    console.log('Cryptocurrency data fetched and saved');
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
  }
};

module.exports = fetchCryptoData;
