'use client';

import { useState } from 'react';

export default function ApiTest() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testApi = async (endpoint, method = 'GET', body = null) => {
    setLoading(true);
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(endpoint, options);
      const data = await response.json();
      
      setResults(prev => ({
        ...prev,
        [endpoint]: {
          status: response.status,
          data,
          success: response.ok
        }
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [endpoint]: {
          status: 'ERROR',
          data: { error: error.message },
          success: false
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testEndpoints = [
    { endpoint: '/api/health', method: 'GET' },
    { endpoint: '/api/test', method: 'GET' },
    { endpoint: '/api/test-db', method: 'GET' },
    { endpoint: '/api/test-signup', method: 'GET' },
    { endpoint: '/api/auth/signup-debug', method: 'GET' },
    { 
      endpoint: '/api/auth/signup-debug', 
      method: 'POST', 
      body: { name: 'Test User', email: 'test@example.com', password: '123456' }
    },
  ];

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">API Test Page</h1>
        
        <div className="mb-4">
          <button 
            onClick={() => testEndpoints.forEach(ep => testApi(ep.endpoint, ep.method, ep.body))}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Test All APIs'}
          </button>
        </div>

        <div className="grid">
          {testEndpoints.map((ep, index) => (
            <div key={index} className="card">
              <div className="card-title">
                {ep.method} {ep.endpoint}
              </div>
              <div className="card-content">
                <button 
                  onClick={() => testApi(ep.endpoint, ep.method, ep.body)}
                  className="btn btn-secondary"
                  style={{ marginBottom: '1rem' }}
                >
                  Test This Endpoint
                </button>
                
                {results[ep.endpoint] && (
                  <div>
                    <p><strong>Status:</strong> {results[ep.endpoint].status}</p>
                    <p><strong>Success:</strong> {results[ep.endpoint].success ? '✅' : '❌'}</p>
                    <details>
                      <summary>Response Data</summary>
                      <pre style={{ 
                        background: '#f5f5f5', 
                        padding: '1rem', 
                        borderRadius: '5px',
                        overflow: 'auto',
                        fontSize: '0.875rem'
                      }}>
                        {JSON.stringify(results[ep.endpoint].data, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a href="/" className="btn btn-secondary">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 