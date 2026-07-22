import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';
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
        
        // Add status lines progressively
        const interval = setInterval(() => {
            if (currentIndex < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[currentIndex]]);
                setProgress(Math.min(100, Math.round(((currentIndex + 1) / bootSequence.length) * 100)));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    // Auto-scroll logs to bottom as new entries arrive
    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [lines]);

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 overflow-hidden select-none">
            {/* Background ambient glowing gradient */}
            <div className="absolute inset-0 bg-radial from-emerald-950/30 via-slate-950 to-slate-950 pointer-events-none" />

            <div className="relative z-10 w-full max-w-xl flex flex-col items-center text-center space-y-6">
                
                {/* FIXED STATIC ICON & BRANDING HEADER (Never moves/scrolls) */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
                        <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 animate-ping opacity-75" />
                        <Logo className="w-12 h-12 relative z-10" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-extrabold tracking-widest text-slate-100 uppercase">
                            EduMart <span className="text-emerald-400">Academy</span>
                        </h2>
                        <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mt-1">
                            Initializing Learning Environment
                        </p>
                    </div>
                </div>

                {/* Smooth Progress Bar */}
                <div className="w-full bg-slate-900/80 border border-slate-800 rounded-full p-1 shadow-inner">
                    <div 
                        className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 h-2 rounded-full transition-all duration-500 ease-out shadow-lg shadow-emerald-500/20"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* ACADEMIC STATUS TERMINAL (Auto-scrolls internally, no screen scrollbar) */}
                <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-2xl text-left h-48 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-2 text-emerald-400 font-bold">
                            <ShieldCheck size={14} /> SECURE CHANNEL
                        </span>
                        <span className="flex items-center gap-1">
                            <Cpu size={12} className="animate-spin text-slate-400" /> {progress}%
                        </span>
                    </div>

                    {/* Scrollable logs inside terminal frame only */}
                    <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs text-slate-300 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                        {lines.map((line, idx) => (
                            <div key={idx} className="flex items-start gap-2 animate-fade-in">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span className="text-slate-400 text-[10px] min-w-[55px]">
                                    [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                                </span>
                                <span className="text-slate-200">{line}</span>
                            </div>
                        ))}
                        {lines.length < bootSequence.length && (
                            <div className="flex items-center gap-2 text-emerald-400 font-bold animate-pulse">
                                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                                <span>Waking backend cloud instance...</span>
                            </div>
                        )}
                        <div ref={logsEndRef} />
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-xs text-slate-500 font-medium">
                    Free cloud services may take up to 30 seconds to wake from sleep. Thank you for your patience!
                </p>

            </div>
        </div>
    );
};

export default Bootloader;
