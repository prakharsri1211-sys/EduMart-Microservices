import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ChevronRight, Eye, EyeOff, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL || "https://edumart-gateway.onrender.com";

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        
        try {
            await axios.post(
                `${API_URL}/api/auth/register`,
                { username, password, role },
                { headers: { "Content-Type": "application/json" } }
            );

            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            console.error(err);
            setError("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-edu-cream flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-edu-dark/5 border border-edu-light transform transition-all">
                <div className="text-center mb-8 flex flex-col items-center">
                    <Logo className="w-16 h-16 mb-4" />
                    <h2 className="text-3xl font-extrabold text-edu-dark tracking-tight uppercase">Create Account</h2>
                    <p className="text-edu-dark/70 mt-2 font-medium">Join EduMart today</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 rounded-lg bg-edu-mint border border-edu-sage/50 text-edu-dark text-sm text-center font-bold">
                        {success}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
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
                                placeholder="Create a password"
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

                    <div className="space-y-2 relative">
                        <label className="text-sm font-bold text-edu-dark ml-1">I am a...</label>
                        <div 
                            className="w-full px-4 py-3 bg-edu-cream/50 border border-edu-light rounded-xl focus-within:ring-2 focus-within:ring-edu-sage text-edu-dark font-medium transition-colors cursor-pointer flex justify-between items-center"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <span className={!role ? "text-edu-dark/50" : ""}>
                                {!role ? 'Choose your role...' : role === 'STUDENT' ? 'Student' : role === 'INSTRUCTOR' ? 'Instructor' : 'Administrator'}
                            </span>
                            <ChevronDown className={`h-5 w-5 text-edu-sage transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>
                        
                        {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-edu-light rounded-xl shadow-lg overflow-hidden">
                                {['STUDENT', 'INSTRUCTOR', 'ADMIN'].map((r) => (
                                    <div
                                        key={r}
                                        className="px-4 py-3 hover:bg-edu-mint cursor-pointer text-edu-dark font-medium transition-colors"
                                        onClick={() => {
                                            setRole(r);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {r === 'STUDENT' ? 'Student' : r === 'INSTRUCTOR' ? 'Instructor' : 'Administrator'}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !role}
                        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-edu-cream bg-edu-dark hover:bg-edu-dark/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-edu-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed group uppercase tracking-wider"
                    >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                        {!isLoading && <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-edu-dark/70 font-medium">
                    Already have an account?{' '}
                    <Link to="/" className="font-bold text-edu-sage hover:text-edu-dark transition-colors underline decoration-2 underline-offset-4">
                        Sign in instead
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
