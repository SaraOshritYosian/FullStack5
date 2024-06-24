import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CompleteRegistration() {
    const {username, password} = useParams();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleCompleteRegistration = async (e) => {
        e.preventDefault();

        const userDetails = {
            username,
            website: password,
            fullName,
            email,
            address
        };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDetails)
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("currentUser", data);
                navigate('/home');
            } else {
                alert('Registration completion failed');
            }
        } catch (err) {
            alert('An error occurred');
        }
    };

    return (
        <div>
            <h1>Complete Registration</h1>
            <form onSubmit={handleCompleteRegistration}>
                <div>
                    <label>Full Name: </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address: </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Complete Registration</button>
            </form>
        </div>
    );
}

export default CompleteRegistration;
