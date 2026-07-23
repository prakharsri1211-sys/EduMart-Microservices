import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, Upload, Video, CheckCircle, ChevronDown } from 'lucide-react';
import Bootloader from './Bootloader';

const CreateCourse = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    // Simple state to hold form values for now
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        price: '',
        category: 'programming',
        difficulty: 'beginner',
        videoUrl: '',
        thumbnail: null
    });

    const [showNotification, setShowNotification] = useState(false);
    const [error, setError] = useState('');
    const [showBootloader, setShowBootloader] = useState(false);
    
    // Custom dropdown states
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);
    const categoryRef = useRef(null);
    const difficultyRef = useRef(null);

    const fileInputRef = useRef(null);
    const API_URL = process.env.REACT_APP_API_URL || "https://edumart-gateway.onrender.com";

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
            if (difficultyRef.current && !difficultyRef.current.contains(event.target)) {
                setIsDifficultyOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, thumbnail: e.target.files[0] }));
        }
    };

    const normalizeVideoUrl = (rawUrl) => {
        if (!rawUrl) return '';
        let url = rawUrl.trim();
        if (!url) return '';
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortMatch && shortMatch[1]) {
            return `https://www.youtube.com/watch?v=${shortMatch[1]}`;
        }
        return url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        // Show bootloader if taking longer than 1.5 seconds (Render cold start)
        const bootloaderTimer = setTimeout(() => {
            setShowBootloader(true);
        }, 1500);

        try {
            const formattedVideoUrl = normalizeVideoUrl(formData.videoUrl);
            const payload = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                difficulty: formData.difficulty,
                videoUrl: formattedVideoUrl,
                thumbnailUrl: formData.thumbnail ? formData.thumbnail.name : null
            };

            await axios.post(`${API_URL}/api/courses`, payload, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true // Ensures JWT cookie is sent!
            });

            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigate('/courses');
            }, 2000);
        } catch (err) {
            console.error(err);
            setError("Failed to save course. Please try again.");
        } finally {
            clearTimeout(bootloaderTimer);
            setIsLoading(false);
            setShowBootloader(false);
        }
    };

    return (
        <>
        {showBootloader && <Bootloader />}
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Toast Notification */}
            <div className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}`}>
                <div className="bg-edu-dark text-edu-cream px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                    <CheckCircle className="text-edu-mint h-6 w-6" />
                    <div>
                        <h4 className="font-bold">Success!</h4>
                        <p className="text-sm text-edu-cream/80">Course saved successfully.</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => navigate('/courses')}
                    className="p-2 text-edu-dark/70 hover:bg-edu-light/50 rounded-lg transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-3xl font-extrabold text-edu-dark tracking-tight uppercase">Create New Course</h2>
                    <p className="text-edu-dark/70 font-medium">Build your curriculum and share your knowledge</p>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Section */}
                <div className="bg-white rounded-2xl border border-edu-light shadow-sm p-6 space-y-6">
                    <h2 className="text-lg font-bold text-edu-dark border-b border-edu-light pb-4 uppercase tracking-wider">Basic Information</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Course Title</label>
                            <input 
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Complete Python Masterclass"
                                className="w-full px-4 py-3 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark placeholder-edu-dark/40 focus:outline-none focus:ring-2 focus:ring-edu-sage focus:border-transparent transition-all font-medium"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Subtitle</label>
                            <input 
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                placeholder="A catchy tagline for your course"
                                className="w-full px-4 py-3 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark placeholder-edu-dark/40 focus:outline-none focus:ring-2 focus:ring-edu-sage focus:border-transparent transition-all font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Detailed Description</label>
                            <textarea 
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="What will students learn in this course?"
                                className="w-full px-4 py-3 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark placeholder-edu-dark/40 focus:outline-none focus:ring-2 focus:ring-edu-sage focus:border-transparent transition-all font-medium resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="bg-white rounded-2xl border border-edu-light shadow-sm p-6 space-y-6">
                    <h2 className="text-lg font-bold text-edu-dark border-b border-edu-light pb-4 uppercase tracking-wider">Course Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Price ($)</label>
                            <input 
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                placeholder="0.00 (Free)"
                                className="w-full px-4 py-3 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark placeholder-edu-dark/40 focus:outline-none focus:ring-2 focus:ring-edu-sage focus:border-transparent transition-all font-medium"
                            />
                        </div>

                        <div ref={categoryRef} className="relative">
                            <label className="block text-sm font-bold text-edu-dark mb-2">Category</label>
                            <div 
                                className="w-full px-4 py-3 bg-edu-cream/50 border border-edu-light rounded-xl focus-within:ring-2 focus-within:ring-edu-sage text-edu-dark font-medium transition-colors cursor-pointer flex justify-between items-center"
                                onClick={() => { setIsCategoryOpen(!isCategoryOpen); setIsDifficultyOpen(false); }}
                            >
                                <span>
                                    {formData.category === 'programming' ? 'Programming & Tech' :
                                     formData.category === 'design' ? 'Design' :
                                     formData.category === 'business' ? 'Business & Marketing' :
                                     'Academic Subjects'}
                                </span>
                                <ChevronDown className={`h-5 w-5 text-edu-sage transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {isCategoryOpen && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-edu-light rounded-xl shadow-lg overflow-hidden py-1">
                                    {[
                                        { val: 'programming', label: 'Programming & Tech' },
                                        { val: 'design', label: 'Design' },
                                        { val: 'business', label: 'Business & Marketing' },
                                        { val: 'academic', label: 'Academic Subjects' }
                                    ].map((opt) => (
                                        <div 
                                            key={opt.val}
                                            className="px-4 py-3 hover:bg-edu-cream/50 cursor-pointer text-edu-dark font-medium transition-colors"
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, category: opt.val }));
                                                setIsCategoryOpen(false);
                                            }}
                                        >
                                            {opt.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div ref={difficultyRef} className="relative">
                            <label className="block text-sm font-bold text-edu-dark mb-2">Difficulty</label>
                            <div 
                                className="w-full px-4 py-3 bg-edu-cream/50 border border-edu-light rounded-xl focus-within:ring-2 focus-within:ring-edu-sage text-edu-dark font-medium transition-colors cursor-pointer flex justify-between items-center"
                                onClick={() => { setIsDifficultyOpen(!isDifficultyOpen); setIsCategoryOpen(false); }}
                            >
                                <span className="capitalize">{formData.difficulty}</span>
                                <ChevronDown className={`h-5 w-5 text-edu-sage transition-transform ${isDifficultyOpen ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {isDifficultyOpen && (
                                <div className="absolute z-10 w-full mt-2 bg-white border border-edu-light rounded-xl shadow-lg overflow-hidden py-1">
                                    {['beginner', 'intermediate', 'advanced'].map((opt) => (
                                        <div 
                                            key={opt}
                                            className="px-4 py-3 hover:bg-edu-cream/50 cursor-pointer text-edu-dark font-medium transition-colors capitalize"
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, difficulty: opt }));
                                                setIsDifficultyOpen(false);
                                            }}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Media Section */}
                <div className="bg-white rounded-2xl border border-edu-light shadow-sm p-6 space-y-6">
                    <h2 className="text-lg font-bold text-edu-dark border-b border-edu-light pb-4 uppercase tracking-wider">Media</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Course Intro Video URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-edu-sage">
                                    <Video size={18} />
                                </div>
                                <input 
                                    type="text"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    placeholder="e.g., https://youtu.be/inilpYn_r4g or https://vimeo.com/12345"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark placeholder-edu-dark/40 focus:outline-none focus:ring-2 focus:ring-edu-sage focus:border-transparent transition-all font-medium"
                                />
                            </div>
                            <p className="text-xs text-edu-dark/70 mt-2 font-medium">Provide a Vimeo, YouTube, or direct video link for now.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Course Thumbnail</label>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="image/jpeg, image/png, image/webp" 
                                className="hidden" 
                            />
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-edu-sage rounded-xl p-8 flex flex-col items-center justify-center text-center bg-edu-cream/50 hover:bg-edu-light/30 transition-colors cursor-pointer group"
                            >
                                <div className="h-12 w-12 rounded-full bg-edu-mint flex items-center justify-center text-edu-dark mb-4 group-hover:scale-110 transition-transform">
                                    <Upload size={24} />
                                </div>
                                <span className="text-sm font-bold text-edu-dark mb-1">
                                    {formData.thumbnail ? formData.thumbnail.name : 'Click to upload thumbnail'}
                                </span>
                                <span className="text-xs text-edu-dark/60 font-medium">JPG, PNG or WEBP (Max 2MB)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center py-3 px-8 bg-edu-dark hover:bg-edu-dark/90 text-edu-cream font-bold rounded-xl transition-all shadow-md disabled:opacity-50 uppercase tracking-wider text-sm"
                    >
                        {isLoading ? 'Saving...' : (
                            <>
                                <Save size={20} className="mr-2" />
                                Save & Publish Course
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default CreateCourse;
