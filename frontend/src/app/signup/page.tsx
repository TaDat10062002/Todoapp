import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function SignupPage() {
    return (
        <>
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black p-4 sm:p-6">
                <Card className="w-full max-w-md mx-auto rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                    <CardHeader className="text-center p-4">
                        <CardTitle className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Create Account
                        </CardTitle>
                        <CardDescription className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">
                            Join the Todo App and start managing your tasks today.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <form className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    required
                                    className="h-11 px-4 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    className="h-11 px-4 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    required
                                    className="h-11 px-4 text-base border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                Sign Up
                            </Button>
                            <div className="text-center text-base text-gray-500 dark:text-gray-400 mt-4">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
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