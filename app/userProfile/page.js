'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/user/userProfile');
  }, [router]);

  return (
    <div className="container">
      <div className="form-container">
        <div className="text-center">
          <h1>Redirecting...</h1>
          <p>Please wait while we redirect you to the correct page.</p>
        </div>
      </div>
    </div>
  );
} 