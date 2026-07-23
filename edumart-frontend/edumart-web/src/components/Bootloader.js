import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, GraduationCap, Loader2 } from 'lucide-react';
import Logo from './Logo';

const Bootloader = () => {
    const [lines, setLines] = useState([]);
    const [progress, setProgress] = useState(15);
    const logsEndRef = useRef(null);

    const bootSequence = [
        "Connecting to EduMart Academic Cloud...",
        "Authenticating session credentials...",
        "Warming up course microservices...",
        "Connecting to database cluster...",
        "Loading course catalog & curriculum assets...",
        "Securing learning environment...",
        "Optimizing workspace performance...",
        "Initialization complete. Welcome to EduMart!"
    ];

    useEffect(() => {
        let currentIndex = 0;
        
        const interval = setInterval(() => {
            if (currentIndex < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[currentIndex]]);
                setProgress(Math.min(100, Math.round(((currentIndex + 1) / bootSequence.length) * 100)));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    // Auto-scroll inside the log console only (no full-page scrolling)
    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lines]);

    return (
        <div className="fixed inset-0 z-[100] bg-edu-cream text-edu-dark flex flex-col items-center justify-center p-6 overflow-hidden select-none">
            
            <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center space-y-6">
                
                {/* FIXED STATIC ACADEMIC BRANDING HEADER (Never scrolls/moves) */}
                <div className="flex flex-col items-center space-y-3 flex-shrink-0">
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white border-2 border-edu-sage/30 shadow-xl shadow-edu-dark/5">
                        <Logo className="w-12 h-12 relative z-10" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-extrabold tracking-wider text-edu-dark uppercase flex items-center justify-center gap-2">
                            EduMart <span className="text-edu-sage">Academy</span>
                        </h2>
                        <p className="text-xs font-bold text-edu-dark/70 tracking-widest uppercase mt-1 flex items-center justify-center gap-1.5">
                            <GraduationCap size={14} className="text-edu-sage" /> Academic Environment Initializing
                        </p>
                    </div>
                </div>

                {/* Academic Progress Bar */}
                <div className="w-full bg-edu-light/50 border border-edu-sage/30 rounded-full h-3 p-0.5 shadow-inner">
                    <div 
                        className="bg-gradient-to-r from-edu-sage via-teal-600 to-edu-dark h-full rounded-full transition-all duration-500 ease-out shadow-sm"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* ACADEMIC STATUS CONSOLE (Internal scrolling only) */}
                <div className="w-full bg-white rounded-2xl border border-edu-light p-5 shadow-xl text-left h-48 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between border-b border-edu-light pb-2 mb-3 text-xs text-edu-dark/70 font-sans font-bold">
                        <span className="flex items-center gap-2 text-edu-sage font-extrabold tracking-wider uppercase">
                            <ShieldCheck size={16} /> Secure Academic Portal
                        </span>
                        <span className="flex items-center gap-1 font-mono text-edu-dark">
                            <Loader2 size={13} className="animate-spin text-edu-sage" /> {progress}%
                        </span>
                    </div>

                    {/* Scrollable logs inside container only */}
                    <div className="flex-1 overflow-y-auto space-y-2 text-xs font-medium text-edu-dark/80 pr-1 scrollbar-thin scrollbar-thumb-edu-light">
                        {lines.map((line, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 animate-fade-in">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span className="text-edu-dark/50 font-mono text-[10px] min-w-[55px]">
                                    [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                                </span>
                                <span className="text-edu-dark font-medium">{line}</span>
                            </div>
                        ))}
                        {lines.length < bootSequence.length && (
                            <div className="flex items-center gap-2 text-edu-sage font-bold animate-pulse pt-1">
                                <span className="inline-block w-2 h-2 rounded-full bg-edu-sage" />
                                <span>Loading service components...</span>
                            </div>
                        )}
                        <div ref={logsEndRef} />
                    </div>
                </div>

                {/* Academic Footer Note */}
                <p className="text-xs text-edu-dark/60 font-medium">
                    Connecting to cloud servers. Initial loads may take a few seconds.
                </p>

            </div>
        </div>
    );
};

export default Bootloader;
