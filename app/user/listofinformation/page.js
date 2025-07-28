'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import BlogCard from '../../Components/BlogCard';

export default function UserInformationList() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const fetchInfo = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (category) {
        params.append('category', category);
      }

      const response = await fetch(`/api/blogs?${params}`);
      if (response.ok) {
        const data = await response.json();
        setInfo(data.info);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching info:', error);
    } finally {
      setLoading(false);
    }
  }, [page, category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="d-flex justify-between align-center">
            <div>
              <h1>Information List</h1>
              <p>Browse through our collection of informative articles</p>
            </div>
            <div className="d-flex gap-2">
              <Link href="/user/userProfile" className="btn btn-secondary">
                Profile
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
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="form-label">
            Filter by Category
          </label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
            style={{ maxWidth: '200px' }}
          >
            <option value="">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="General">General</option>
          </select>
        </div>

                  {info.length === 0 ? (
            <div className="text-center">
              <p>No information found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid">
                {info.map((item) => (
                  <BlogCard
                    key={item._id}
                    blog={item}
                    showActions={false}
                  />
                ))}
              </div>

            {totalPages > 1 && (
              <div className="d-flex justify-center gap-2 mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                
                <span className="d-flex align-center">
                  Page {page} of {totalPages}
                </span>
                
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 