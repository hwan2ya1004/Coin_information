// netlify/functions/fetchCandle.js

const fetch = require('node-fetch'); // node-fetch 설치 필요

exports.handler = async function(event, context) {
  try {
    const { market, count } = event.queryStringParameters;
    
    if (!market) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Market parameter is required' }),
      };
    }
    
    const candleCount = count ? parseInt(count) : 24; // 기본적으로 24개의 1시간 간격 캔들 데이터
    
    // Upbit API의 1시간 간격 캔들 데이터 가져오기
    const response = await fetch(`https://api.upbit.com/v1/candles/minutes/60?market=${market}&count=${candleCount}`);
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Failed to fetch candle data for ${market}` }),
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
