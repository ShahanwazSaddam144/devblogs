"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function VerifyEmailPage() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 max-w-md text-center">
                <h1 className="text-3xl font-bold mb-4">Check Your Email!</h1>
                <p className="mb-6">
                    We have sent a verification email to your Gmail account. Please check your inbox and follow the instructions to verify your account.
                </p>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                    Didn&lsquo;t receive the email? Check your spam folder 
                </p>
                <Link
                    href="/login"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
