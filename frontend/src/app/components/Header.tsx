'use client';
import {usePathname} from "next/navigation";
export default function Header() {
    const pathName: string = usePathname();
    return (
       <>
           {
               pathName === "/login" || pathName === '/signup' || pathName === '/forgot-password' ? null: <h1>Header</h1>
           }
       </>
    )
}