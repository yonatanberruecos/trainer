'use client'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { MainContext } from '../context/MainContextAppProvider';

export const useAuth = () => {
  const [user, setUser] = <any>useState(null);
  const { workoutData, setWorkoutData  } = useContext<any>(MainContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await getCurrentUser();
        if(workoutData.user.email || authenticatedUser) {
          const emailUser = workoutData.user.email || authenticatedUser?.signInDetails?.loginId
          setUser(emailUser);
          console.log('authenticatedUser', authenticatedUser, workoutData, emailUser);
          setWorkoutData((prev: any) => {
            return {
              ...prev,
              user: {
                email: emailUser,
                name: prev.user.name
              }
            }
          });
        } else {
          router.push('/login');
        }
      } catch {
        // Redirect to login if user is not authenticated
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  return user;
};
