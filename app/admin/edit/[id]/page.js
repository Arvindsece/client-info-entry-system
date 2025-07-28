'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '../../../Components/BlogForm';

export default function AdminEdit() {
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
      </div>
    );
  }

  return (
    <div className="container">
      <BlogForm blogId={params.id} initialData={info} />
    </div>
  );
} 