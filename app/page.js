import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div className="form-container">
        <h1 className="form-title">Welcome to Client Info System</h1>
        
        <div className="grid">
          <div className="card">
            <div className="card-title">Admin Access</div>
            <div className="card-content">
              <p>Manage blogs, create content, and oversee the system.</p>
              <div className="mt-3 d-flex gap-2">
                <Link href="/admin/login" className="btn btn-primary">
                  Admin Login
                </Link>
                <Link href="/admin/signup" className="btn btn-secondary">
                  Admin Signup
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">User Access</div>
            <div className="card-content">
              <p>Browse information, read articles, and access content.</p>
              <div className="mt-3 d-flex gap-2">
                <Link href="/user/userLogin" className="btn btn-primary">
                  User Login
                </Link>
                <Link href="/user/signup" className="btn btn-secondary">
                  User Signup
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p>Choose your access level to get started</p>
          <div className="mt-3 d-flex gap-2 justify-center">
            <Link href="/auth-demo" className="btn btn-secondary">
              View Authentication Demo
            </Link>
            <Link href="/api-test" className="btn btn-secondary">
              Test API Routes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
