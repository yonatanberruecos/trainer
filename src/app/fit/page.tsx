'use client'
import MainComponent from "@/components/MainComponent.tsx/MainComponent"
import { useAuth } from "@/app/hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

interface IdataWorkout {
  userworkout_id: number,
  userworkout_workout_routine: string;
  userworkout_workout_id: number;
  userworkout_routine_summary: string;
}

export default function fit() {
    const user = useAuth();
    const [workoutInfo, setWorkoutInfo] = useState<string>('');
    const searchParams = useSearchParams();
    const routine_id = searchParams.get('routine_id'); // get ?routine_id=123

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
            const data: IdataWorkout[] = await response.json();
            const routine = data.filter(item => item.userworkout_id === Number(routine_id));
            // const data = [{id: "1", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}, {id: "2", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}]
            console.log('userworkout_workout_routine', routine)
            setWorkoutInfo(routine[0].userworkout_workout_routine);
          } catch (error) {
            console.error('Error fetching items:', error);
          }
        };
    
        if(user && routine_id) {
          fetchItems();
        }
      }, [user, routine_id]);

    if (!user) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;

    return (
        <MainComponent workoutInfo={workoutInfo}></MainComponent>
    )
};
