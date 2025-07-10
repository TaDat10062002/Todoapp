'use client';
import {usePathname} from "next/navigation";
import {useDispatch} from "react-redux";
import {LOGOUT} from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import Link from "next/link";

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
                    <header
                        className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-sm">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        TodoFlow
                                    </h1>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div
                                        className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                                        <span className="text-white text-sm font-semibold">VN</span>
                                    </div>
                                    <svg onClick={logout} xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor"
                                         className="size-6 hover:text-white hover:bg-red-500 rounded-full p-1 transition-all duration-200">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </header>
            }
        </>
    )
}