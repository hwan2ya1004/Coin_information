const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { markets } = event.queryStringParameters;

  if (!markets) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Markets parameter is required.' }),
    };
  }

  const upbitURL = `https://api.upbit.com/v1/ticker?markets=${markets}`;

  try {
    const response = await fetch(upbitURL);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Error fetching data from Upbit API.' }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error.' }),
    };
  }
};
