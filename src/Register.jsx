/*import React from "react";

function Register(){
    return(
        <div>
            <h1>Register</h1>
        </div>
    )
}



export default Register; */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== passwordVerify) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();
            const userExists = users.find(user => user.username === username);

            if (userExists) {
                setError('Username already exists');
            } else {
                const newUser = { username, password };
                const postResponse = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });

                if (postResponse.ok) {
                    navigate('/complete-registration');
                } else {
                    setError('Registration failed');
                }
            }
        } catch (err) {
            setError('An error occurred');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Verify Password: </label>
                    <input
                        type="password"
                        value={passwordVerify}
                        onChange={(e) => setPasswordVerify(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
