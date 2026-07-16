import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`rounded-full bg-edu-dark flex items-center justify-center shadow-lg shadow-edu-dark/20 relative group ${className}`}>
            {/* Subtle inner ring */}
            <div className="absolute inset-1 border border-edu-sage/30 rounded-full"></div>

            {/* Icon SVG */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F1EFE6"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3/5 h-3/5 relative z-10"
            >
                {/* The Book (forming the main basket of the cart) */}
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                
                {/* Cart elements seamlessly integrated */}
                {/* Handle */}
                <path d="M20 6h2.5l-1 5" />
                
                {/* Wheels */}
                <circle cx="9" cy="22" r="1.5" fill="#F1EFE6" stroke="none" />
                <circle cx="16" cy="22" r="1.5" fill="#F1EFE6" stroke="none" />
                
                {/* Abstract pages/circuit lines inside the book */}
                <path d="M10 6v5" stroke="#7FA79C" strokeWidth="1" />
                <path d="M14 8v3" stroke="#7FA79C" strokeWidth="1" />
            </svg>
        </div>
    );
};

export default Logo;
