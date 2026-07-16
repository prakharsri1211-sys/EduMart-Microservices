import React, { useState, useEffect } from 'react';
import { BookOpen, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const [userRole, setUserRole] = useState('STUDENT');
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        if (role) {
            setUserRole(role);
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
                    <h1 className="text-3xl font-extrabold text-edu-dark tracking-tight uppercase">
                        {isStudent ? 'Course Catalog' : 'Course Management'}
                    </h1>
                    <p className="text-edu-dark/70 mt-1 font-medium">
                        {isStudent ? 'Browse and enroll in available courses.' : 'Manage and create your courses.'}
                    </p>
                </div>
                {!isStudent && (
                    <button 
                        onClick={handleCreateCourse}
                        className="flex items-center py-2 px-4 bg-edu-dark hover:bg-edu-dark/90 text-edu-cream font-bold rounded-md transition-colors uppercase tracking-wider text-sm"
                    >
                        <PlusCircle size={20} className="mr-2" />
                        New Course
                    </button>
                )}
            </div>
            
            <div className="mt-8 bg-white rounded-2xl border border-edu-light shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
                <div className="h-16 w-16 rounded-xl bg-edu-mint flex items-center justify-center text-edu-dark mb-4">
                    <BookOpen size={32} />
                </div>
                <h2 className="text-xl font-extrabold text-edu-dark uppercase tracking-wider">
                    {isStudent ? 'No courses available' : 'No courses yet'}
                </h2>
                <p className="text-edu-dark/70 mt-2 text-center max-w-md font-medium">
                    {isStudent 
                        ? 'There are currently no courses published in the catalog. Check back later!' 
                        : "You haven't created any courses yet. Click 'New Course' to get started."}
                </p>
                
                {!isStudent && (
                    <button 
                        onClick={handleCreateCourse}
                        className="mt-6 py-2 px-6 bg-edu-dark hover:bg-edu-dark/90 text-edu-cream font-bold rounded-md transition-colors uppercase tracking-wider text-sm"
                    >
                        Create Your First Course
                    </button>
                )}
            </div>
        </div>
    );
};

export default Courses;
