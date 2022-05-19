import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { LoginProvider } from './helper/Context';
import Home from './components/Home';
import ProtectedRoute from './helper/ProtectedRoute';
import SignUp from './components/SignUp';

function Main() {
  return (
    <LoginProvider>
      <div className="mainapp">
        <h1>Mini Youtube Player</h1>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/videoplayer" element={<App />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </LoginProvider>
  );
}

export default Main;
