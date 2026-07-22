import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    BookOpen, 
    CreditCard, 
    Settings, 
    LogOut, 
    Menu, 
    X, 
    GraduationCap,
    Users
} from 'lucide-react';
import axios from 'axios';
import Logo from './Logo';

const Layout = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get role from localStorage since token is now in HttpOnly cookie
    const userRole = localStorage.getItem('userRole') || 'STUDENT';

    const API_URL = process.env.REACT_APP_API_URL || "https://edumart-gateway.onrender.com";

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`);
        } catch (e) {
            console.error("Logout error", e);
        }
        localStorage.removeItem("userRole");
        navigate("/");
    };

    // Navigation items based on role
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, roles: ['STUDENT', 'INSTRUCTOR', 'ADMIN'] },
        { path: '/courses', label: 'Courses', icon: <BookOpen size={18} />, roles: ['INSTRUCTOR', 'ADMIN'] },
        { path: '/my-courses', label: 'My Learning', icon: <GraduationCap size={18} />, roles: ['STUDENT'] },
        { path: '/students', label: 'Students', icon: <Users size={18} />, roles: ['INSTRUCTOR', 'ADMIN'] },
        { path: '/payments', label: 'Payments', icon: <CreditCard size={18} />, roles: ['STUDENT', 'ADMIN'] },
        { path: '/settings', label: 'Settings', icon: <Settings size={18} />, roles: ['STUDENT', 'INSTRUCTOR', 'ADMIN'] },
    ];

    const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

    return (
        <div className="min-h-screen bg-edu-cream flex flex-col font-sans text-edu-dark">
            
            {/* Top Navigation Bar */}
            <header className="h-20 border-b border-edu-sage/20 bg-edu-cream sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
                    
                    {/* Left: Logo and Brand */}
                    <div className="flex items-center gap-3">
                        <Logo className="w-10 h-10 md:w-12 md:h-12" />
                        <span className="text-lg md:text-xl font-extrabold tracking-widest uppercase text-edu-dark hidden sm:block">EduMart</span>
                    </div>

                    {/* Middle/Right: Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        {filteredNavItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center text-sm font-semibold uppercase tracking-wider transition-colors hover:text-edu-sage ${
                                    location.pathname === item.path 
                                    ? 'text-edu-dark underline decoration-2 underline-offset-8' 
                                    : 'text-edu-dark/70'
                                }`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Far Right: User Profile & Logout (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-4 ml-6">
                        <div className="flex flex-col text-right">
                            <span className="text-xs text-edu-sage font-semibold uppercase tracking-wider">Role</span>
                            <span className="text-sm font-bold text-edu-dark">{userRole}</span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="px-4 py-2 border-2 border-edu-dark rounded-sm text-sm font-bold text-edu-dark hover:bg-edu-dark hover:text-edu-cream transition-colors flex items-center gap-2"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-edu-dark hover:bg-edu-light rounded-md transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Dropdown */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-edu-cream border-b border-edu-sage/20 absolute top-20 left-0 right-0 z-40 shadow-xl shadow-edu-dark/10">
                    <nav className="px-4 py-4 space-y-2">
                        {filteredNavItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors ${
                                    location.pathname === item.path 
                                    ? 'bg-edu-mint text-edu-dark' 
                                    : 'text-edu-dark/70 hover:bg-edu-light hover:text-edu-dark'
                                }`}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-edu-sage/20">
                            <button 
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-bold text-edu-cream bg-edu-dark hover:bg-edu-dark/90 transition-colors"
                            >
                                <LogOut size={18} className="mr-3" /> Logout
                            </button>
                        </div>
                    </nav>
                </div>
            )}

            {/* Page Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
