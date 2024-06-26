import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import CompleteRegistration from './pages/CompleteRegistration';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Info from './pages/Info';
import Todos from './pages/Todos';
import Posts from './pages/Posts';
import Albums from './pages/Albums';
import Error from './pages/Error';
import ProtectedRoute from './pages/ProtectedRoute';
import Photos from './pages/Photos';


function App() {

  return (
   <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="register/:username/:password" element={<CompleteRegistration />} />
          <Route
            path="/"
            element={
              <Navigate to={"/login"}/>
            }
          />
          <Route element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>}>
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id/info"
              element={
                <ProtectedRoute>
                  <Info />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id/todos"
              element={
                <ProtectedRoute>
                  <Todos />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:userId/posts"
              element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              }
            />
            <Route
              path="users/:id/albums"
              element={
                <ProtectedRoute>
                  <Albums />
                </ProtectedRoute>
              }/>
                <Route
                path="users/:id/albums/:albumId/photos"
                element={
                  <ProtectedRoute>
                    <Photos />
                  </ProtectedRoute>
                }/>
          </Route>
          <Route path="*" element={<ProtectedRoute><Error/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;