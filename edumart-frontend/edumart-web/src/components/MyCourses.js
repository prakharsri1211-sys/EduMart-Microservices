import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">My Learning</h1>
                <p className="text-slate-400 mt-1">View your enrolled courses.</p>
            </div>
            
            <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                    <GraduationCap size={32} />
                </div>
                <h2 className="text-xl font-semibold text-white">No active enrollments</h2>
                <p className="text-slate-400 mt-2 text-center max-w-md">
                    You haven't enrolled in any courses yet. Browse the catalog to start learning.
                </p>
                <Link to="/courses" className="mt-6 py-2 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors">
                    Browse Courses
                </Link>
            </div>
        </div>
    );
};

export default MyCourses;
