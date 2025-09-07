'use client'
import MainFit from "@/components/MainFit/MainFit"
import { Suspense } from "react"

export default function fit() {
    return (
      <Suspense fallback={<div className="p-0"></div>}>
        <MainFit></MainFit>
      </Suspense>
    )
};
