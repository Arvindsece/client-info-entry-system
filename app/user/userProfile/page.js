'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="d-flex justify-between align-center mb-4">
          <h1 className="form-title">User Profile</h1>
                      <div className="d-flex gap-2">
              <Link href="/user/listofinformation" className="btn btn-secondary">
                Back to Info List
              </Link>
            <button 
              onClick={async () => {
                try {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  window.location.href = '/';
                } catch (error) {
                  console.error('Logout error:', error);
                }
              }}
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>
          
          {user ? (
            <div className="card">
              <div className="card-title">Profile Information</div>
              <div className="card-content">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>User ID:</strong> {user.id}</p>
              </div>
            </div>
          ) : (
            <div className="alert alert-error">
              Unable to load profile information
            </div>
          )}
        </div>
      </div>
  );
} 