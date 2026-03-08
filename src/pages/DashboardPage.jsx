import React from 'react';
import { Link } from 'react-router-dom';
import { FileUp, ClipboardCheck, BarChart3, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const DashboardPage = () => {
    const { user, examData } = useAppContext();

    const stats = [
        { label: 'Pending Evaluations', value: examData.students.length > 0 ? '5' : '0', icon: <Clock size={20} />, color: '#f2994a' },
        { label: 'Completed Today', value: examData.evaluatedAt ? '12' : '0', icon: <CheckCircle2 size={20} />, color: '#27ae60' },
        { label: 'Avg. Accuracy', value: examData.evaluatedAt ? '94%' : '0%', icon: <BarChart3 size={20} />, color: '#2f80ed' },
    ];

    const recentActivities = [
        { title: 'Question Paper Uploaded', time: '2 hours ago', status: 'success' },
        { title: 'Evaluation in Progress', time: '15 mins ago', status: 'pending' },
    ];

    return (
        <div>
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>
                    Welcome back, {user?.email || 'Teacher'}
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening with your exam evaluations today.</p>
            </div>

            <div className="grid grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
                {stats.map((stat, index) => (
                    <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                        <div style={{ padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-sm)', backgroundColor: `${stat.color}10`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2">
                <div className="card">
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        <Link to="/upload-question" className="btn btn-outline" style={{ justifyContent: 'flex-start', gap: 'var(--spacing-sm)', padding: 'var(--spacing-md)' }}>
                            <FileUp size={20} />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: 600 }}>Upload New Question Paper</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Start a new evaluation workflow</div>
                            </div>
                        </Link>
                        <Link to="/upload-answers" className="btn btn-outline" style={{ justifyContent: 'flex-start', gap: 'var(--spacing-sm)', padding: 'var(--spacing-md)' }}>
                            <ClipboardCheck size={20} />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: 600 }}>Evaluate Answer Sheets</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Capture or upload student submissions</div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {recentActivities.map((activity, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--spacing-sm) 0', borderBottom: index < recentActivities.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                    {activity.status === 'success' ? <CheckCircle2 size={16} color="#27ae60" /> : <Clock size={16} color="#f2994a" />}
                                    <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{activity.title}</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{activity.time}</span>
                            </div>
                        ))}
                        {recentActivities.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--spacing-md)' }}>No recent activity to show.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
