import React, { useState, useEffect } from 'react';
import { BookOpen, PlusCircle, Video, Tag, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
    const [userRole, setUserRole] = useState('STUDENT');
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

    useEffect(() => {
        const role = localStorage.getItem('userRole') || 'STUDENT';
        setUserRole(role);

        axios.get(`${API_URL}/api/courses`, { withCredentials: true })
            .then(res => {
                if (Array.isArray(res.data)) {
                    setCourses(res.data);
                }
            })
            .catch(err => console.error("Failed to fetch courses", err))
            .finally(() => setIsLoading(false));
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
                        className="flex items-center py-2.5 px-5 bg-edu-dark hover:bg-edu-dark/90 text-edu-cream font-bold rounded-xl transition-all shadow-md uppercase tracking-wider text-sm"
                    >
                        <PlusCircle size={18} className="mr-2" />
                        New Course
                    </button>
                )}
            </div>
            
            {isLoading ? (
                <div className="flex items-center justify-center p-12 text-edu-dark/60 font-medium">
                    Loading course catalog...
                </div>
            ) : courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-2xl border border-edu-light p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-extrabold px-3 py-1 bg-edu-mint/60 text-edu-dark rounded-full uppercase tracking-wider">
                                        {course.category || 'General'}
                                    </span>
                                    <span className="text-xs font-bold text-edu-sage uppercase flex items-center gap-1">
                                        <Award size={14} /> {course.difficulty || 'All levels'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-edu-dark group-hover:text-edu-sage transition-colors line-clamp-1">
                                    {course.title}
                                </h3>
                                <p className="text-edu-dark/70 text-sm mt-2 line-clamp-2 font-medium">
                                    {course.description || 'No description provided.'}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-edu-light/80 flex items-center justify-between">
                                <span className="text-lg font-extrabold text-edu-dark">
                                    {course.price && course.price > 0 ? `$${course.price.toFixed(2)}` : 'Free'}
                                </span>

                                {course.videoUrl && (
                                    <a 
                                        href={course.videoUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <Video size={14} /> Watch Preview
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
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
                            className="mt-6 py-2 px-6 bg-edu-dark hover:bg-edu-dark/90 text-edu-cream font-bold rounded-md transition-colors uppercase tracking-wider text-sm shadow-sm"
                        >
                            Create Your First Course
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Courses;
