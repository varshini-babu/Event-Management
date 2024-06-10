import React from 'react';
import jwt_decode from 'jwt-decode';

const JwtDecodeTest = () => {
  const testToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhc21pdGhhQGdtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE3MTcwNDczNzEsImV4cCI6MTcxNzA1MDk3MX0.Gceu_vFW-CBoiKiT4P_XToDGSsQEycNEepamRU_1dpw'; // Replace with a valid token

  try {
    const decoded = jwt_decode(testToken);
    console.log(decoded);
  } catch (error) {
    console.error('Error decoding token', error);
  }

  return <div>Check the console for decoded token</div>;
};

export default JwtDecodeTest;
