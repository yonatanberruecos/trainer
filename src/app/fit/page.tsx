'use client'
import MainComponent from "@/components/MainComponent.tsx/MainComponent"
import { useAuth } from "@/app/hooks/useAuth";

export default function fit() {
    const user = useAuth();

    if (!user) return <p>Loading...</p>;
    
    return (
        <MainComponent></MainComponent>
    )
};
