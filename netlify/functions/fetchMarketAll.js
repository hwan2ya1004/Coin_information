// netlify/functions/fetchMarketAll.js

exports.handler = async function(event, context) {
  try {
    const response = await fetch('https://api.upbit.com/v1/market/all?isDetails=true');
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch market data' }),
      };
    }
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // 모든 도메인에서 접근 허용
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
