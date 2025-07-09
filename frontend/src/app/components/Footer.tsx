'use client'
import {usePathname} from "next/navigation";

export default function Footer() {
    const pathName: string = usePathname();

    return (
        <>
            {
                pathName === "/auth/login" || pathName === '/auth/signup' || pathName === '/auth/forgot-password' ? null :
                    <h1>Footer</h1>
            }
        </>
    )
}