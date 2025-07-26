'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUser(null);
        router.push('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return <header className={styles.header}>Loading...</header>;
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Client Info System
        </Link>
        
        <nav className={styles.nav}>
          {user ? (
            <>
              <span className={styles.welcome}>
                Welcome, {user.name} ({user.role})
              </span>
              
                             {user.role === 'admin' && (
                 <>
                   <Link href="/admin/dashboard" className={styles.navLink}>
                     Dashboard
                   </Link>
                   <Link href="/admin/create" className={styles.navLink}>
                     Create Info
                   </Link>
                   <Link href="/admin/profile" className={styles.navLink}>
                     Profile
                   </Link>
                 </>
               )}
              
              {user.role === 'user' && (
                <>
                  <Link href="/user/listofinformation" className={styles.navLink}>
                    Information List
                  </Link>
                  <Link href="/user/userProfile" className={styles.navLink}>
                    Profile
                  </Link>
                  <Link href="/user/terms&Conditions" className={styles.navLink}>
                    Terms
                  </Link>
                </>
              )}
              
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/admin/login" className={styles.navLink}>
                Admin Login
              </Link>
              <Link href="/userLogin" className={styles.navLink}>
                User Login
              </Link>
              <Link href="/admin/signup" className={styles.navLink}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
} 