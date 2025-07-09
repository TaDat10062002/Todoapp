'use client';
import {ChangeEvent, useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import * as z from "zod/v4";
import {login} from "@/services/auth.api";
import {useDispatch, useSelector} from "react-redux";
import axiosClient from "@/services/axiosClient";
import {LOGIN} from "@/store/slices/authSlice";
import {useRouter} from "next/navigation";
import toast from 'react-hot-toast';

export default function LoginPage() {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const router = useRouter();

    useEffect(() => {
        if (isLoggedIn) router.push('/');
    }, [isLoggedIn, router]);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [dataForm, setDataForm] = useState({
        email: '',
        password: ''
    })

    const loggedUser = useSelector((state: any) => state.auth.loggedUser)
    const dispatch = useDispatch();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginSchema = z.object({
            email: z.string()
                .nonempty({message: 'Email is required'})
                .email({message: 'Invalid email format'}),
            password: z.string()
                .nonempty({message: 'Password is required'})
                .min(8, {message: 'Password must be at least 8 characters long'}),
        });
        const result = loginSchema.safeParse(dataForm)
        if (!result.success) {
            const formatted = result.error.format();
            setErrors({
                email: formatted.email?._errors[0] || '',
                password: formatted.password?._errors[0] || ''
            })
        } else {
            setErrors({
                email: '',
                password: ''
            })
            const res = await login(dataForm);
            toast.success('Login successfully');
            const payload = {
                isLoggedIn: true,
                loggedUser: res.data.loggedUser,
                accessToken: res.data.accessToken
            }
            dispatch(LOGIN(payload));
            localStorage.setItem('user', JSON.stringify(payload));
            router.push('/');
        }
    }

    return (
        <>
            <div className="flex items-center justify-center dark:from-gray-900 dark:to-black p-4 sm:p-6 mt-10">
                <Card
                    className="w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                    <CardHeader className="space-y-3 text-center p-8 pb-6">
                        <CardTitle className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Sign In
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <form onSubmit={handleLogin} className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </Label>
                                <Input
                                    type="text"
                                    value={dataForm.email}
                                    placeholder="your.email@example.com"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataForm({
                                        ...dataForm,
                                        email: e.target.value
                                    })}
                                    className="h-11 px-4 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                />
                                {
                                    errors && errors.email &&
                                    <div className="text-red-500 text-sm pl-2">{errors.email}</div>
                                }
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password"
                                           className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </Label>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline transition-colors duration-200"
                                        prefetch={false}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    type="password"
                                    value={dataForm.password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDataForm({
                                        ...dataForm,
                                        password: e.target.value
                                    })}
                                    className="h-11 px-4 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                />
                                {
                                    errors && errors.password &&
                                    <div className="text-red-500 text-sm pl-2">{errors.password}</div>
                                }
                            </div>
                            <Button
                                type="submit"
                                className="cursor-pointer w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                Login
                            </Button>
                            <div className="text-center text-base text-gray-500 dark:text-gray-400 mt-4">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/auth/signup"
                                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline transition-colors duration-200"
                                    prefetch={false}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}