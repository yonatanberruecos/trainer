'use client'
import MainComponent from "@/components/MainComponent.tsx/MainComponent"
import { MainContextAppProvider } from "../context/MainContextAppProvider"

export default function fit() {
    return (
        <MainContextAppProvider>
            <MainComponent></MainComponent>
        </MainContextAppProvider>
    )
};
