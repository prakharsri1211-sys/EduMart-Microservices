import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold text-edu-dark tracking-tight uppercase">My Learning</h1>
                <p className="text-edu-dark/70 mt-1 font-medium">View your enrolled courses.</p>
            </div>
            
            <div className="mt-8 bg-white rounded-2xl border border-edu-light shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-16 w-16 rounded-xl bg-edu-mint flex items-center justify-center text-edu-dark mb-4">
                    <GraduationCap size={32} />
                </div>
                <h2 className="text-xl font-extrabold text-edu-dark uppercase tracking-wider">No active enrollments</h2>
                <p className="text-edu-dark/70 mt-2 text-center max-w-md font-medium">
                    You haven't enrolled in any courses yet. Browse the catalog to start learning.
                </p>
                <Link to="/courses" className="mt-6 py-2 px-6 bg-edu-dark hover:bg-edu-dark/90 text-edu-cream font-bold rounded-md transition-colors uppercase tracking-wider text-sm shadow-sm">
                    Browse Courses
                </Link>
            </div>
        </div>
    );
};

export default MyCourses;
