'use client'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { MainContext } from '../context/MainContextAppProvider';

export const useAuth = () => {
  const [user, setUser] = <any>useState(null);
  const { workoutData } = useContext<any>(MainContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await getCurrentUser();
        if(workoutData.user.email || authenticatedUser) {
          console.log('authenticatedUser', authenticatedUser, workoutData)
          setUser(workoutData.user.email || authenticatedUser?.signInDetails?.loginId);
        } else {
          router.push('/login');
        }
      } catch {
        // Redirect to login if user is not authenticated
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  return user;
};
