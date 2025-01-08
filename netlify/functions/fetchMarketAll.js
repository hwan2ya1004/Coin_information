// netlify/functions/fetchMarketAll.js

const fetch = require('node-fetch'); // node-fetch 설치 필요

exports.handler = async function(event, context) {
  try {
    // Upbit API의 전체 마켓 정보 가져오기
    const response = await fetch('https://api.upbit.com/v1/market/all');
    
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: '마켓 정보를 가져오지 못했습니다.' }),
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
