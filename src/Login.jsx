
import React, { useState } from 'react';
import { useErrorMessage } from './costumizedHooks/UseError';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useErrorMessage('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    try {
      let url = `http://localhost:3000/users?username=${username}`;
      const response = await fetch(url);
      if (!response.ok) {
        setErrorMessage("Authentication failed");
        return;
      }
      const users = await response.json();
      if(users.length === 0) {
        setErrorMessage("User not found");
        return;
      }
      const user = users.find(
        (user) => user.website === password
      );
      if (!user) {
        setErrorMessage("Invalid username or password");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(localStorage.getItem("currentUser"));
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid username or password");
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <h4>{errorMessage}</h4>
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <button type="button" >
          Register
        </button>
      </form>
    </div>
  );
}