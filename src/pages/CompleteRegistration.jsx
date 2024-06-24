import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CompleteRegistration() {
    const { username, password } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [catchPhrase, setCatchPhrase] = useState('');
    const [bs, setBs] = useState('');
    const navigate = useNavigate();

    const handleCompleteRegistration = async (e) => {
        e.preventDefault();

        const userDetails = {
            username,
            name,
            email,
            address: {
                street,
                suite,
                city,
                zipcode,
                geo: {
                    lat,
                    lng
                }
            },
            phone,
            website: password,
            company: {
                name: companyName,
                catchPhrase,
                bs
            }
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
                localStorage.setItem("currentUser", JSON.stringify(data));
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <label>Street: </label>
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Suite: </label>
                    <input
                        type="text"
                        value={suite}
                        onChange={(e) => setSuite(e.target.value)}
                    />
                </div>
                <div>
                    <label>City: </label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Zipcode: </label>
                    <input
                        type="text"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Latitude: </label>
                    <input
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                    />
                </div>
                <div>
                    <label>Longitude: </label>
                    <input
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone: </label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        disabled
                    />
                </div>
                <div>
                    <label>Company Name: </label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Catch Phrase: </label>
                    <input
                        type="text"
                        value={catchPhrase}
                        onChange={(e) => setCatchPhrase(e.target.value)}
                    />
                </div>
                <div>
                    <label>BS: </label>
                    <input
                        type="text"
                        value={bs}
                        onChange={(e) => setBs(e.target.value)}
                    />
                </div>
                <button type="submit">Complete Registration</button>
            </form>
        </div>
    );
}

export default CompleteRegistration;
