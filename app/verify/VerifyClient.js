'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyClient() {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        const verifyAccount = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verify?token=${token}`);
                if (res.ok) {
                    setSuccess(true);
                    setTimeout(() => router.push('/'), 3000);
                } else {
                    console.error('Verification failed');
                }
            } catch (err) {
                console.error('Verification error:', err);
            } finally {
                setLoading(false);
            }
        };

        verifyAccount();
    }, [token, router]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f5f7fa',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            padding: '0 20px'
        }}>
            {loading ? (
                <>
                    <h2 style={{ color: '#333' }}>Verifying your account...</h2>
                    <div style={{
                        marginTop: '20px',
                        width: '100%',
                        maxWidth: '400px',
                        background: '#eee',
                        height: '12px',
                        borderRadius: '6px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, #4f8cff 0%, #38e1ff 100%)',
                            animation: 'loadingBar 1.5s infinite linear'
                        }} />
                    </div>
                    <style>{`
                        @keyframes loadingBar {
                          0% { transform: translateX(-100%); }
                          100% { transform: translateX(100%); }
                        }
                    `}</style>
                </>
            ) : success ? (
                <>
                    <h2 style={{ color: '#38a169' }}>Your account has been verified!</h2>
                    <p style={{ marginTop: '10px', color: '#555' }}>
                        Redirecting to homepage...
                    </p>
                </>
            ) : (
                <h2 style={{ color: '#e53e3e' }}>Verification failed. Please try again.</h2>
            )}
        </div>
    );
}
