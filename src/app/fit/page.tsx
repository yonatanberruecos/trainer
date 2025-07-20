'use client'
import MainComponent from "@/components/MainComponent.tsx/MainComponent"
import { useAuth } from "@/app/hooks/useAuth";
import { MainContext } from "../context/MainContextAppProvider";
import { useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function fit() {
    // const user = useAuth();
    const router = useRouter();
    const { workoutData } = useContext<any>(MainContext);

    useEffect(() => {
        const checkUser = async () => {
          if(!workoutData.user.email){
            router.push('/login');
          }
        };
    
        checkUser();
      }, [router]);

    if (!workoutData.user.email) return <p>Loading...</p>;
    
    return (
        <MainComponent></MainComponent>
    )
};
