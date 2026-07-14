import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { BookOpen, Users, TrendingUp, DollarSign } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [userRole, setUserRole] = useState('STUDENT');
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded.role || decoded.authorities || 'STUDENT');
            } catch (e) {
                console.error("Token decode error", e);
            }
        }
        
        // Example: Fetching dynamic data from Student Service through Gateway
        if (userRole === 'STUDENT' && token) {
            axios.get("http://localhost:8080/api/student/details", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setStudentData(res.data))
            .catch(err => console.error("Failed to fetch student details", err));
        }
    }, [userRole]);

    const StatCard = ({ title, value, icon: Icon, trend }) => (
        <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-colors group">
            <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className="text-sm font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
                <p className="text-slate-400 mt-1">Here's what's happening in your account today.</p>
            </div>

            {userRole === 'ADMIN' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Students" value="0" icon={Users} />
                    <StatCard title="Active Courses" value="0" icon={BookOpen} />
                    <StatCard title="Platform Revenue" value="$0" icon={DollarSign} />
                    <StatCard title="Avg Completion" value="0%" icon={TrendingUp} />
                </div>
            )}

            {userRole === 'INSTRUCTOR' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="My Students" value="0" icon={Users} />
                    <StatCard title="Published Courses" value="0" icon={BookOpen} />
                    <StatCard title="Earnings" value="$0" icon={DollarSign} />
                </div>
            )}

            {userRole === 'STUDENT' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard title="Enrolled Courses" value="0" icon={BookOpen} />
                    <StatCard title="Overall Progress" value="0%" icon={TrendingUp} />
                </div>
            )}

            <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {/* Placeholder for real data */}
                    {studentData ? (
                        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-300">
                            {studentData}
                        </div>
                    ) : (
                        <p className="text-slate-400 text-sm">No recent activity to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;