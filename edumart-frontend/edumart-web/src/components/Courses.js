import React from 'react';
import { BookOpen } from 'lucide-react';

const Courses = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Course Management</h1>
                <p className="text-slate-400 mt-1">Manage and create courses.</p>
            </div>
            
            <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                    <BookOpen size={32} />
                </div>
                <h2 className="text-xl font-semibold text-white">No courses yet</h2>
                <p className="text-slate-400 mt-2 text-center max-w-md">
                    You haven't created any courses yet. Get started by clicking the button below.
                </p>
                <button className="mt-6 py-2 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors">
                    Create Course
                </button>
            </div>
        </div>
    );
};

export default Courses;
