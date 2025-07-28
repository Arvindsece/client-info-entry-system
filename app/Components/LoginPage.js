'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage({ userType = 'admin' }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = userType === 'admin' ? '/api/auth/login' : '/api/auth/userLogin';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect based on user type
        if (userType === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/user/listofinformation');
        }
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="text-center mb-4">
          <h1 className="form-title">
            {userType === 'admin' ? 'Admin Login' : 'User Login'}
          </h1>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>
            Welcome back! Please sign in to your account
          </p>
        </div>
        
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? (
              <span>
                <span className="spinner" style={{ 
                  width: '16px', 
                  height: '16px', 
                  borderWidth: '2px',
                  display: 'inline-block',
                  marginRight: '8px'
                }}></span>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p style={{ color: '#666' }}>
            Don&apos;t have an account?{' '}
            <Link 
              href={userType === 'admin' ? '/admin/signup' : '/user/signup'}
              style={{ 
                color: '#667eea', 
                textDecoration: 'underline',
                fontWeight: '500'
              }}
            >
              {userType === 'admin' ? 'Create Admin Account' : 'Register'}
            </Link>
          </p>
        </div>

        <div className="text-center mt-3">
          <Link 
            href="/"
            style={{ 
              color: '#666', 
              textDecoration: 'underline',
              fontSize: '0.875rem'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 