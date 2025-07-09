'use client'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useState} from "react";
import {AiFillEye, AiFillEyeInvisible, AiOutlineEyeInvisible} from "react-icons/ai";
import * as z from "zod/v4";
import {register} from "@/services/auth.api";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [dataForm, setDataForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const registerSchema = z.object({
        fullName: z.string().nonempty({message: 'Fullname is required'}),
        email: z.string().nonempty({message: 'Email is required'}).email({message: 'Invalid email format'}),
        password: z.string().nonempty({message: 'Password is required'}).min(8, {message: 'Password must be at least 8 characters long'}),
        confirmPassword: z.string().nonempty({message: 'Confirm password is required'}).min(8, {message: 'Confirm password must be at least 8 characters long'}),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'], // Gắn lỗi vào trường này
        message: 'Password and confirm password must be the same'
    })

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = registerSchema.safeParse(dataForm);
        if (!result.success) {
            const formatted = result.error.format();
            setErrors({
                fullName: formatted.fullName?._errors[0] || '',
                email: formatted.email?._errors[0] || '',
                password: formatted.password?._errors[0] || '',
                confirmPassword: formatted.confirmPassword?._errors[0] || '',
            })
        } else {
            setErrors({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

            const {confirmPassword, ...data} = dataForm;
            register({...data})
            router.push('/auth/login')
        }
    }

    return (
        <>
            <div
                className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4 sm:p-6">
                <Card
                    className="w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Create Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <form onSubmit={handleRegister} className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Fullname
                                </Label>
                                <Input
                                    onChange={(e) => setDataForm({...dataForm, fullName: e.target.value})}
                                    value={dataForm.fullName}
                                    type="text"
                                    placeholder="your.email@example.com"
                                    className="h-11 px-4 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                />
                                {
                                    errors && errors.fullName &&
                                    <div className='text-red-500 pl-2 text-sm'>{errors.fullName}</div>
                                }
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </Label>
                                <Input
                                    onChange={(e) => setDataForm({...dataForm, email: e.target.value})}
                                    value={dataForm.email}
                                    type="text"
                                    placeholder="your.email@example.com"
                                    className="h-11 px-4 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                />
                                {
                                    errors && errors.email &&
                                    <div className='text-red-500 pl-2 text-sm'>{errors.email}</div>
                                }
                            </div>
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        onChange={(e) => setDataForm({...dataForm, password: e.target.value})}
                                        value={dataForm.password}
                                        id="password"
                                        placeholder="Type your password here"
                                        type={showPassword ? 'text' : 'password'}
                                        className="h-11 px-4 pr-10 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                    />
                                    {
                                        errors && errors.password &&
                                        <div className='text-red-500 text-sm pl-2'>{errors.password}</div>
                                    }
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
                                    </button>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password"
                                       className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </Label>
                                <Input
                                    onChange={(e) => setDataForm({...dataForm, confirmPassword: e.target.value})}
                                    value={dataForm.confirmPassword}
                                    id="confirm-password"
                                    placeholder="confirm your password here"
                                    type={showPassword ? 'text' : 'password'}
                                    className="h-11 px-4 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                />
                                {
                                    errors && errors.confirmPassword &&
                                    <div className='text-red-500 text-sm pl-2'>{errors.confirmPassword}</div>
                                }
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                Sign Up
                            </Button>
                            <div className="text-center text-base text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href="/auth/login"
                                    className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline transition-colors duration-200"
                                    prefetch={false}
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}