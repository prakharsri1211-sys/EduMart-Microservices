import React, { useEffect, useState } from 'react';
import { BookOpen, Users, TrendingUp, DollarSign } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [userRole, setUserRole] = useState('STUDENT');
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        // Read role from localStorage (the actual JWT is in an HttpOnly cookie)
        const role = localStorage.getItem('userRole');
        if (role) {
            setUserRole(role);
        }
        
        // Example: Fetching dynamic data from Student Service through Gateway
        // Cookies are sent automatically because we set withCredentials: true globally
        if (role === 'STUDENT') {
            axios.get("http://localhost:8080/api/student/details")
            .then(res => setStudentData(res.data))
            .catch(err => console.error("Failed to fetch student details", err));
        }
    }, []);

    const StatCard = ({ title, value, icon: Icon, trend }) => (
        <div className="bg-white p-6 rounded-2xl border border-edu-light shadow-sm hover:border-edu-sage/50 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-edu-mint flex items-center justify-center text-edu-dark group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className="text-sm font-bold text-edu-dark bg-edu-light/50 px-2 py-1 rounded-lg">
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-edu-dark/70 text-sm font-bold uppercase tracking-wider">{title}</h3>
            <p className="text-2xl font-extrabold text-edu-dark mt-1">{value}</p>
        </div>
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-edu-dark tracking-tight uppercase">Welcome back!</h1>
                <p className="text-edu-dark/70 mt-1 font-medium">Here's what's happening in your account today.</p>
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

            <div className="mt-8 bg-white rounded-2xl border border-edu-light p-6 shadow-sm">
                <h2 className="text-lg font-bold text-edu-dark mb-4 uppercase tracking-wider">Recent Activity</h2>
                <div className="space-y-4">
                    {/* Placeholder for real data */}
                    {studentData ? (
                        <div className="p-4 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark font-medium">
                            {studentData}
                        </div>
                    ) : (
                        <p className="text-edu-dark/60 text-sm font-medium">No recent activity to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;