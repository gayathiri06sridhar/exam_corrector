import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, FileUp, ClipboardCheck, BarChart3, LogOut, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
    const { user, setUser } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileActive, setMobileActive] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    const navLinks = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { path: '/upload-question', label: 'Upload Paper', icon: <FileUp size={18} /> },
        { path: '/upload-answers', label: 'Evaluate Answers', icon: <ClipboardCheck size={18} /> },
        { path: '/results', label: 'Results', icon: <BarChart3 size={18} /> },
    ];

    return (
        <header className="header">
            <div className={`container nav ${mobileActive ? 'mobile-active' : ''}`}>
                <Link to="/dashboard" className="logo">
                    <GraduationCap size={24} />
                    <span>AI Exam System</span>
                </Link>

                <nav className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={() => setMobileActive(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user?.email || 'Prof. Anderson'}</span>
                    <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
                        <LogOut size={14} style={{ marginRight: '4px' }} />
                        Logout
                    </button>
                </div>

                <div className="menu-toggle" onClick={() => setMobileActive(!mobileActive)}>
                    <Menu size={24} />
                </div>
            </div>
        </header>
    );
};

const Layout = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    if (isLoginPage) return <>{children}</>;

    return (
        <div className="app-layout">
            <Header />
            <main className="container section">
                {children}
            </main>
        </div>
    );
};

export default Layout;
