'use client'
import { useRouter, usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { MainContext } from '../context/MainContextAppProvider';

export const useAuth = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = <any>useState(null);
  const { workoutData, setWorkoutData  } = useContext<any>(MainContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticatedUser = await getCurrentUser();
        if(workoutData.user.email || authenticatedUser) {
          const emailUser = workoutData.user.email || authenticatedUser?.signInDetails?.loginId
          setUser(emailUser);
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
          if(pathName !== '/fit') {
            router.push('/login');
          }
        }
      } catch {
        // Redirect if call to getCurrentUser fails
        if(pathName !== '/fit') {
          router.push('/login');
        }
      }
    };

    checkAuth();
  }, []);

  return user;
};
