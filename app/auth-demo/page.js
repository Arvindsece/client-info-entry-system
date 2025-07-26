import Link from 'next/link';

export default function AuthDemo() {
  return (
    <div className="container">
        <div className="form-container">
          <h1 className="form-title">Authentication System Demo</h1>
          
          <div className="grid">
            <div className="card">
              <div className="card-title">Admin Authentication</div>
              <div className="card-content">
                <p>Admin users can manage the system, create blogs, and oversee content.</p>
                <div className="d-flex gap-2 mt-3">
                  <Link href="/admin/signup" className="btn btn-primary">
                    Admin Signup
                  </Link>
                  <Link href="/admin/login" className="btn btn-secondary">
                    Admin Login
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-title">User Authentication</div>
              <div className="card-content">
                <p>Regular users can browse information, read blogs, and access content.</p>
                <div className="d-flex gap-2 mt-3">
                  <Link href="/user/signup" className="btn btn-primary">
                    User Signup
                  </Link>
                  <Link href="/user/userLogin" className="btn btn-secondary">
                    User Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-title">API Endpoints</div>
            <div className="card-content">
              <h3>Authentication APIs:</h3>
              <ul style={{ marginLeft: '1rem' }}>
                <li><strong>POST /api/auth/signup</strong> - User registration</li>
                <li><strong>POST /api/auth/login</strong> - Admin login</li>
                <li><strong>POST /api/auth/userLogin</strong> - User login</li>
                <li><strong>GET /api/auth/me</strong> - Get current user</li>
                <li><strong>POST /api/auth/logout</strong> - Logout</li>
              </ul>
              
              <h3>Test APIs:</h3>
              <ul style={{ marginLeft: '1rem' }}>
                <li><strong>GET /api/health</strong> - Health check</li>
                <li><strong>GET /api/test</strong> - Basic API test</li>
                <li><strong>GET /api/db-test</strong> - Database connection test</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/" className="btn btn-secondary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 