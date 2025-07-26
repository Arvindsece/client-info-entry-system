'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogCard({ blog, showActions = false, onDelete = null }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this info?')) {
      try {
        const response = await fetch(`/api/blogs/${blog._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          if (onDelete) {
            onDelete(blog._id);
          } else {
            router.refresh();
          }
        } else {
          alert('Failed to delete info');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('An error occurred while deleting the info');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="card">
      <div className="card-title">
        <Link href={`/user/${blog._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {blog.title}
        </Link>
      </div>
      
      <div className="card-content">
        {truncateContent(blog.content)}
      </div>
      
      <div className="card-meta">
        <div className="d-flex justify-between align-center">
          <div>
            <strong>Author:</strong> {blog.author} | 
            <strong> Category:</strong> {blog.category}
          </div>
          <div>
            {formatDate(blog.createdAt)}
          </div>
        </div>
      </div>

      {showActions && (
        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/admin/edit/${blog._id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
} 