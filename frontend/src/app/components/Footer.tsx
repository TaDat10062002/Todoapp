'use client'
import {usePathname} from "next/navigation";

export default function Footer() {
    const pathName: string = usePathname();

    return (
        <>
            {
                pathName === "/auth/login" || pathName === '/auth/signup' || pathName === '/auth/forgot-password' ? null :
                    <footer className="bg-white border-t border-gray-100 mt-16">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="py-8">
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
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
                                        <h3 className="text-lg font-semibold text-gray-900">TodoFlow</h3>
                                    </div>
                                    <p className="text-sm text-gray-500">© 2024 TodoFlow. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </footer>}
        </>
    )
}