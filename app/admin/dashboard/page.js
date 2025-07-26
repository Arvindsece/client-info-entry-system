'use client';

import { useState, useEffect } from 'react';
import BlogCard from '../../Components/BlogCard';
import Link from 'next/link';

export default function AdminDashboard() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInfo: 0,
    totalUsers: 0,
    recentInfo: 0
  });

  useEffect(() => {
    fetchInfo();
    fetchStats();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await fetch('/api/blogs?limit=10');
      if (response.ok) {
        const data = await response.json();
        setInfo(data.info);
      }
    } catch (error) {
      console.error('Error fetching info:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [infoResponse, usersResponse] = await Promise.all([
        fetch('/api/blogs'),
        fetch('/api/users')
      ]);

      if (infoResponse.ok && usersResponse.ok) {
        const infoData = await infoResponse.json();
        const usersData = await usersResponse.json();

        setStats({
          totalInfo: infoData.pagination.total,
          totalUsers: usersData.pagination.total,
          recentInfo: infoData.info.length
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDeleteInfo = (infoId) => {
    setInfo(info.filter(item => item._id !== infoId));
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
          <h1>Admin Dashboard</h1>
          <p>Manage your blog content and users</p>
        </div>

                  <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-number">{stats.totalInfo}</div>
              <div className="stat-label">Total Info</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.recentInfo}</div>
              <div className="stat-label">Recent Info</div>
            </div>
          </div>

          <div className="d-flex justify-between align-center mb-4">
            <h2>Recent Info</h2>
            <Link href="/admin/create" className="btn btn-primary">
              Create New Info
            </Link>
          </div>

          {info.length === 0 ? (
            <div className="text-center">
              <p>No info found. Create your first info entry!</p>
              <Link href="/admin/create" className="btn btn-primary mt-2">
                Create Info
              </Link>
            </div>
          ) : (
            <div className="grid">
              {info.map((item) => (
                <BlogCard
                  key={item._id}
                  blog={item}
                  showActions={true}
                  onDelete={handleDeleteInfo}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
} 