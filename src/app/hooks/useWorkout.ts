'use client'

import { useEffect } from "react";

export const useWorkout = (user: any) => {
      useEffect(() => {
        const fetchItems = async () => {
          try {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout`); // Replace with actual API
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout?email=${encodeURIComponent(user)}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
            });
            const data = await response.json();
            // const data = [{id: "1", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}, {id: "2", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}]
            // setItems(data);
          } catch (error) {
            console.error('Error fetching items:', error);
          } finally {
            // setLoading(false);
          }
        };
    
        if(user) {
          fetchItems();
        }
      }, [user]);
}