import React, { useState, useEffect } from 'react';

const Bootloader = () => {
    const [lines, setLines] = useState([]);
    const [showCursor, setShowCursor] = useState(true);

    const bootSequence = [
        "INCOMING HTTP REQUEST DETECTED ...",
        "EDUMART GATEWAY WAKING UP ...",
        "ESTABLISHING SECURE CONNECTION ...",
        "ALLOCATING COMPUTE RESOURCES ...",
        "PREPARING INSTANCE FOR INITIALIZATION ...",
        "WARMING UP SUPABASE DATABASE ...",
        "ENVIRONMENT VARIABLES INJECTED ...",
        "FINALIZING STARTUP SEQUENCE ...",
        "OPTIMIZING DEPLOYMENT ...",
        "STEADY HANDS. CLEAN LOGS. YOUR APP IS ALMOST LIVE ..."
    ];

    useEffect(() => {
        let currentIndex = 0;
        
        // Add lines one by one with a delay to simulate terminal booting
        const interval = setInterval(() => {
            if (currentIndex < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 3000); // Add a new line every 3 seconds

        // Blinking cursor effect
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => {
            clearInterval(interval);
            clearInterval(cursorInterval);
        };
    }, []);

    const asciiArt = `
  ______    _       __  __            _   
 |  ____|  | |     |  \\/  |          | |  
 | |__   __| |_   _| \\  / | __ _ _ __| |_ 
 |  __| / _\` | | | | |\\/| |/ _\` | '__| __|
 | |___| (_| | |_| | |  | | (_| | |  | |_ 
 |______\\__,_|\\__,_|_|  |_|\\__,_|_|   \\__|
                                          
    `;

    return (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] text-[#4af626] font-mono p-8 overflow-hidden flex flex-col">
            {/* ASCII Art Logo */}
            <pre className="text-xs sm:text-sm md:text-base whitespace-pre-wrap font-bold mb-8 opacity-80">
                {asciiArt}
            </pre>

            {/* Terminal Lines */}
            <div className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm">
                {lines.map((line, index) => (
                    <div key={index} className="opacity-90">
                        <span className="text-[#888] mr-4">
                            {new Date().toLocaleTimeString('en-US', { hour12: false })}
                        </span>
                        {line}
                    </div>
                ))}
                
                {/* Active typing line with cursor */}
                {lines.length < bootSequence.length && (
                    <div className="opacity-90 mt-4">
                        <span className="text-[#888] mr-4">
                            {new Date().toLocaleTimeString('en-US', { hour12: false })}
                        </span>
                        WAITING FOR RENDER SERVER <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
                    </div>
                )}
            </div>
            
            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-[#333] text-xs text-[#888] flex justify-between">
                <span>SYSTEM: EDUMART-OS v1.0.0</span>
                <span className="animate-pulse text-[#4af626]">PLEASE WAIT...</span>
            </div>
        </div>
    );
};

export default Bootloader;
