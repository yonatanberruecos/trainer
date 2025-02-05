'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCurrentUser, AuthUser } from 'aws-amplify/auth';

export const useAuth = () => {
  const [user, setUser] = <any>useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await getCurrentUser();
        setUser(authenticatedUser);
      } catch {
        // Redirect to login if user is not authenticated
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return user;
};
