'use client'
import {usePathname} from "next/navigation";

export default function Footer() {
    const pathName: string = usePathname();
    return (
        <>
            {
                pathName === "/login" || pathName === '/signup' || pathName === '/forgot-password' ? null: <h1>Footer</h1>
            }
        </>
    )
}