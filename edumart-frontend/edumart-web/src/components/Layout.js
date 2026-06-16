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
    UserCircle,
    GraduationCap,
    Users
} from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Decode token to get role
    const token = localStorage.getItem('token');
    let userRole = 'STUDENT';
    try {
        if (token) {
            const decoded = jwtDecode(token);
            userRole = decoded.role || decoded.authorities || 'STUDENT';
        }
    } catch (e) {
        console.error("Could not decode token");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Navigation items based on role
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: ['STUDENT', 'INSTRUCTOR', 'ADMIN'] },
        { path: '/courses', label: 'Course Management', icon: <BookOpen size={20} />, roles: ['INSTRUCTOR', 'ADMIN'] },
        { path: '/my-courses', label: 'My Learning', icon: <GraduationCap size={20} />, roles: ['STUDENT'] },
        { path: '/students', label: 'Students', icon: <Users size={20} />, roles: ['INSTRUCTOR', 'ADMIN'] },
        { path: '/payments', label: 'Payments', icon: <CreditCard size={20} />, roles: ['STUDENT', 'ADMIN'] },
        { path: '/settings', label: 'Settings', icon: <Settings size={20} />, roles: ['STUDENT', 'INSTRUCTOR', 'ADMIN'] },
    ];

    const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

    return (
        <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800/80 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block flex flex-col`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">EduMart</span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all group ${
                                location.pathname === item.path 
                                ? 'bg-indigo-500/10 text-indigo-400' 
                                : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                            }`}
                        >
                            <span className={`${location.pathname === item.path ? 'text-indigo-400' : 'text-slate-500 group-hover:text-white'} transition-colors`}>
                                {item.icon}
                            </span>
                            <span className="ml-3 font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-700/50">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all group"
                    >
                        <LogOut size={20} className="text-slate-500 group-hover:text-red-400 transition-colors" />
                        <span className="ml-3 font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-md border-b border-slate-700/30 sticky top-0 z-30">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-slate-400 hover:text-white transition-colors p-2 rounded-lg bg-slate-800/50"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex-1 flex justify-end">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-slate-300 hidden sm:block">
                                Role: <span className="text-indigo-400">{userRole}</span>
                            </span>
                            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 border border-slate-600">
                                <UserCircle size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
