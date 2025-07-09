'use client';
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

export default function HomePage() {
    const loggedUser = useSelector((state: any) => (state.auth.loggedUser));
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        if (loggedUser === undefined) {
            toast.error('Please login first');
        }
    }, [loggedUser]);

    if (!isClient) return <Spinner/>
    return (
        <>
            <h1 className={'text-center font-medium'}>{loggedUser?.fullName}</h1>
        </>
    )
}