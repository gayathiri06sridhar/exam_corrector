import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple simulated login - any email works
        const userData = { name: 'Prof. Anderson', email: email || 'teacher@school.edu' };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/dashboard');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%' }}>
            <div className="container" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                        <div className="logo" style={{ justifyContent: 'center', fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>
                            <GraduationCap size={32} />
                            <span>AI Exam System</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Welcome back, Teacher!</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="text"
                                id="email"
                                className="form-input"
                                placeholder="teacher@school.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                            <a href="#" style={{ fontSize: '0.75rem', color: 'var(--primary-color)' }}>Forgot password?</a>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 'var(--spacing-md)' }}>Login</button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-md)' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Don't have an account? <a href="#" style={{ color: 'var(--primary-color)' }}>Contact Admin</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
