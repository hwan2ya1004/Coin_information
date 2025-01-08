// netlify/functions/fetchCandle.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const { market, count } = event.queryStringParameters;
    if (!market) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Market parameter is required' }),
      };
    }

    const candleCount = count ? parseInt(count) : 24;
    const apiUrl = `https://api.upbit.com/v1/candles/minutes/60?market=${market}&count=${candleCount}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Failed to fetch candle data for ${market}` }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
