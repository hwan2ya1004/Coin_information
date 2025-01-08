// netlify/functions/fetchTicker.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const { markets } = event.queryStringParameters;
    if (!markets) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Markets parameter is required' }),
      };
    }

    const apiUrl = `https://api.upbit.com/v1/ticker?markets=${markets}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch ticker data' }),
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
