import React, { useEffect, useState } from 'react';
import api from '../config/axios.config';

const DebugApi = () => {
  const [status, setStatus] = useState('Testing...');
  const [data, setData] = useState(null);

  useEffect(() => {
    testApi();
  }, []);

  const testApi = async () => {
    try {
      console.log('Testing API at baseURL:', api.defaults.baseURL);
      const response = await api.get('/report/operations');
      console.log('Success:', response);
      setStatus('✅ API Connected!');
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
      setStatus(`❌ Error: ${error.message}`);
      setData(error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>API Debug</h2>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Base URL:</strong> {api.defaults.baseURL}</p>
      <button onClick={testApi}>Retry</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DebugApi;
