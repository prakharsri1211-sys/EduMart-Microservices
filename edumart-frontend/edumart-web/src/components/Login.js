import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Added for navigation

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook to change pages

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        try {
            // Talking to API-GATEWAY on Port 8080
            const response = await axios.post(
                "http://localhost:8080/api/auth/login", 
                { username, password }, 
                { headers: { "Content-Type": "application/json" } }
            );

            // Storing the JWT token from response
            localStorage.setItem("token", response.data);
            alert("Login Successful!");
            
            // Redirect to the Dashboard/Front Page
            navigate("/dashboard"); 
        } catch (error) {
            console.error(error);
            alert("Login Failed! Check if Auth-Service is UP.");
        }
    };

    return (
        <div style={{ padding: "50px", textAlign: "center" }}>
            <h2>EduMart Login</h2>
            <div>
                <input 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username" 
                />
            </div>
            <div style={{ marginTop: "10px" }}>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
            </div>
            <button 
                onClick={handleLogin} 
                style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
            >
                Login
            </button>
        </div>
    );
};

export default Login;