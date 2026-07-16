import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Video } from 'lucide-react';

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
        videoUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate an API call
        setTimeout(() => {
            setIsLoading(false);
            alert("Course saved successfully! (Backend integration pending)");
            navigate('/courses');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => navigate('/courses')}
                    className="p-2 rounded-xl bg-edu-light hover:bg-edu-sage text-edu-dark hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-extrabold text-edu-dark uppercase tracking-tight">Create New Course</h1>
                    <p className="text-edu-dark/70 mt-1 font-medium">Fill in the details to publish a new course.</p>
                </div>
            </div>

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

                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark focus:outline-none focus:ring-2 focus:ring-edu-sage focus:border-transparent transition-all font-medium appearance-none"
                            >
                                <option value="programming">Programming & Tech</option>
                                <option value="design">Design</option>
                                <option value="business">Business & Marketing</option>
                                <option value="academic">Academic Subjects</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Difficulty</label>
                            <select 
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark focus:outline-none focus:ring-2 focus:ring-edu-sage focus:border-transparent transition-all font-medium appearance-none"
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
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
                                    type="url"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    placeholder="e.g., https://vimeo.com/your-video-id"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-edu-cream/50 border border-edu-light text-edu-dark placeholder-edu-dark/40 focus:outline-none focus:ring-2 focus:ring-edu-sage focus:border-transparent transition-all font-medium"
                                />
                            </div>
                            <p className="text-xs text-edu-dark/70 mt-2 font-medium">Provide a Vimeo, YouTube, or direct video link for now.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-edu-dark mb-2">Course Thumbnail</label>
                            <div className="border-2 border-dashed border-edu-sage rounded-xl p-8 flex flex-col items-center justify-center text-center bg-edu-cream/50 hover:bg-edu-light/30 transition-colors cursor-pointer group">
                                <div className="h-12 w-12 rounded-full bg-edu-mint flex items-center justify-center text-edu-dark mb-4 group-hover:scale-110 transition-transform">
                                    <Upload size={24} />
                                </div>
                                <span className="text-sm font-bold text-edu-dark mb-1">Click to upload thumbnail</span>
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
    );
};

export default CreateCourse;
