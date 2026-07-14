import React, { useState, useEffect } from 'react';
import { BookOpen, PlusCircle } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const [userRole, setUserRole] = useState('STUDENT');
    const navigate = useNavigate();

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
    }, []);

    const handleCreateCourse = () => {
        navigate('/courses/new');
    };

    const isStudent = userRole === 'STUDENT';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        {isStudent ? 'Course Catalog' : 'Course Management'}
                    </h1>
                    <p className="text-slate-400 mt-1">
                        {isStudent ? 'Browse and enroll in available courses.' : 'Manage and create your courses.'}
                    </p>
                </div>
                {!isStudent && (
                    <button 
                        onClick={handleCreateCourse}
                        className="flex items-center py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
                    >
                        <PlusCircle size={20} className="mr-2" />
                        New Course
                    </button>
                )}
            </div>
            
            <div className="mt-8 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-16 w-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                    <BookOpen size={32} />
                </div>
                <h2 className="text-xl font-semibold text-white">
                    {isStudent ? 'No courses available' : 'No courses yet'}
                </h2>
                <p className="text-slate-400 mt-2 text-center max-w-md">
                    {isStudent 
                        ? 'There are currently no courses published in the catalog. Check back later!' 
                        : "You haven't created any courses yet. Click 'New Course' to get started."}
                </p>
                
                {!isStudent && (
                    <button 
                        onClick={handleCreateCourse}
                        className="mt-6 py-2 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-colors"
                    >
                        Create Your First Course
                    </button>
                )}
            </div>
        </div>
    );
};

export default Courses;
