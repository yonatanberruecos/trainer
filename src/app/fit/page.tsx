'use client'
import MainComponent from "@/components/MainComponent.tsx/MainComponent"
import { useAuth } from "@/app/hooks/useAuth";
import { CircularProgress } from "@mui/material";

export default function fit() {
    const user = useAuth();

    if (!user) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    
    return (
        <MainComponent></MainComponent>
    )
};
