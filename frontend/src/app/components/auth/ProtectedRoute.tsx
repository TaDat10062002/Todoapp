'use client'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function ProtectedRoute({children}: { children: React.ReactNode }) {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/auth/login');
        }
    }, [isLoggedIn, router]);

    return <>{children}</>
}