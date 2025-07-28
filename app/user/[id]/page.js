'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function UserInfoDetail() {
  const params = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const fetchInfo = useCallback(async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setInfo(data.info);
      }
    } catch (error) {
      console.error('Error fetching info:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="container">
        <div className="alert alert-error">
          Info not found
        </div>
        <Link href="/user/listofinformation" className="btn btn-primary">
          Back to Information List
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="mb-3">
          <Link href="/user/listofinformation" className="btn btn-secondary">
            ← Back to Information List
          </Link>
        </div>

        <div className="card">
          <div className="card-title">{info.title}</div>
          
          <div className="card-meta">
            <div className="d-flex justify-between align-center">
              <div>
                <strong>Author:</strong> {info.author} | 
                <strong> Category:</strong> {info.category}
              </div>
              <div>
                {formatDate(info.createdAt)}
              </div>
            </div>
          </div>

          <div className="card-content" style={{ 
            whiteSpace: 'pre-wrap', 
            lineHeight: '1.8',
            fontSize: '1.1rem',
            marginTop: '1rem'
          }}>
            {info.content}
          </div>
        </div>
      </div>
    </div>
  );
} 