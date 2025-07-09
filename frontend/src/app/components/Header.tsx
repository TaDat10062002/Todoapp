'use client';
import {usePathname} from "next/navigation";
import {useDispatch} from "react-redux";
import {LOGOUT} from "@/store/slices/authSlice";
import toast from "react-hot-toast";

export default function Header() {
    const pathName: string = usePathname();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(LOGOUT());
        toast.success('Logout successfully');
    }

    return (
        <>
            {
                pathName === "/auth/login" || pathName === '/auth/signup' || pathName === '/auth/forgot-password' ? null :
                    <div>
                        <button onClick={logout} className='bg-red-500 p-2 rounded block ml-auto m-4'>Logout</button>
                    </div>
            }
        </>
    )
}