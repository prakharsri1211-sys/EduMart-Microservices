import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ChevronRight, Eye, EyeOff } from 'lucide-react';
import Logo from './Logo';
import Bootloader from './Bootloader';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showBootloader, setShowBootloader] = useState(false);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError('');
        
        // Show the bootloader if it takes longer than 1.5 seconds
        const bootloaderTimer = setTimeout(() => {
            setShowBootloader(true);
        }, 1500);
        
        try {
            // Talking to API-GATEWAY
            const response = await axios.post(
                `${API_URL}/api/auth/login`, 
                { username, password }, 
                { headers: { "Content-Type": "application/json" } }
            );

            // The JWT is now securely stored in an HttpOnly cookie set by the backend!
            // We only need to store the non-sensitive role for UI rendering.
            localStorage.setItem("userRole", response.data.role);
            
            // Redirect to the Dashboard
            navigate("/dashboard"); 
        } catch (err) {
            console.error(err);
            setError("Invalid username or password. Please try again.");
        } finally {
            clearTimeout(bootloaderTimer);
            setIsLoading(false);
            setShowBootloader(false);
        }
    };

    return (
        <>
        {showBootloader && <Bootloader />}
        <div className="min-h-screen bg-edu-cream flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-edu-dark/5 border border-edu-light transform transition-all">
                <div className="text-center mb-8 flex flex-col items-center">
                    <Logo className="w-16 h-16 mb-4" />
                    <h2 className="text-3xl font-extrabold text-edu-dark tracking-tight uppercase">Welcome Back</h2>
                    <p className="text-edu-dark/70 mt-2 font-medium">Sign in to your EduMart account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-edu-dark ml-1">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-edu-sage" />
                            </div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3 bg-edu-cream/50 border border-edu-light rounded-xl focus:ring-2 focus:ring-edu-sage focus:border-transparent text-edu-dark placeholder-edu-dark/40 transition-colors font-medium"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-edu-dark ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-edu-sage" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-11 pr-12 py-3 bg-edu-cream/50 border border-edu-light rounded-xl focus:ring-2 focus:ring-edu-sage focus:border-transparent text-edu-dark placeholder-edu-dark/40 transition-colors font-medium"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-edu-sage hover:text-edu-dark transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-edu-cream bg-edu-dark hover:bg-edu-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-edu-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed group uppercase tracking-wider"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                        {!isLoading && <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-edu-dark/70 font-medium">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-bold text-edu-sage hover:text-edu-dark transition-colors underline decoration-2 underline-offset-4">
                        Register now
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;