// netlify/functions/fetchCandle.js

exports.handler = async function(event, context) {
  try {
    const { market, candleInterval } = event.queryStringParameters;

    if (!market) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Market parameter is required' }),
      };
    }

    // Upbit API의 일별 캔들 데이터 가져오기 (최근 1일)
    const response = await fetch(`https://api.upbit.com/v1/candles/days?market=${market}&count=1`);

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch candle data' }),
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
