import React from 'react';

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/"; // Send back to login
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>EduMart Dashboard</h1>
            <p style={{ color: 'green' }}>Authentication Verified via API Gateway</p>
            <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
                <h3>Welcome, Administrator</h3>
                <p>Your JWT is safely stored in local storage.</p>
            </div>
            <button onClick={handleLogout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;