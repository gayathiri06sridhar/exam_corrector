import React, { useState } from 'react';
import { Download, FileText, Share2, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const StudentResultRow = ({ student }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div style={{ borderBottom: '1px solid var(--border-color)' }}>
            <div
                onClick={() => setExpanded(!expanded)}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--spacing-md)',
                    cursor: 'pointer',
                    backgroundColor: expanded ? '#f8f9fa' : 'transparent'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700
                    }}>
                        {student.name.charAt(0)}
                    </div>
                    <div>
                        <div style={{ fontWeight: 600 }}>{student.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Roll: {student.roll}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>SCORE</div>
                        <div style={{
                            fontWeight: 700,
                            color: student.score >= 40 ? 'var(--success-color)' : 'var(--error-color)',
                            fontSize: '1.125rem'
                        }}>
                            {student.score}%
                        </div>
                    </div>
                    {expanded ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
                </div>
            </div>

            {expanded && (
                <div style={{ padding: 'var(--spacing-lg)', backgroundColor: '#fff', borderTop: '1px solid var(--border-color)' }}>
                    <h4 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '0.875rem' }}>AI Feedback & Observations</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {student.feedback.map((item, idx) => (
                            <li key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <CheckCircle2 size={16} color="var(--success-color)" style={{ marginTop: '2px', flexShrink: 0 }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: 'var(--spacing-sm)' }}>
                        <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '6px 12px', gap: '4px' }}>
                            <FileText size={14} /> Full Evaluation PDF
                        </button>
                        <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '6px 12px', gap: '4px' }}>
                            <Share2 size={14} /> Send to Student
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const ResultsPage = () => {
    const { examData } = useAppContext();

    const averageScore = examData.students.length > 0
        ? Math.round(examData.students.reduce((acc, s) => acc + (s.score || 0), 0) / examData.students.length)
        : 0;

    const passCount = examData.students.filter(s => (s.score || 0) >= 40).length;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>Evaluation Results</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {examData.subject || 'Exam'} - Evaluated on {examData.evaluatedAt ? new Date(examData.evaluatedAt).toLocaleDateString() : 'N/A'}
                    </p>
                </div>
                <button className="btn btn-primary" style={{ gap: '8px' }}>
                    <Download size={18} /> Download All Results
                </button>
            </div>

            <div className="grid grid-cols-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Avg. Batch Score</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-color)' }}>{averageScore}%</div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Pass Percentage</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-color)' }}>
                        {examData.students.length > 0 ? Math.round((passCount / examData.students.length) * 100) : 0}%
                    </div>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)' }}>Total Students</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{examData.students.length}</div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--border-color)', backgroundColor: '#f1f3f4', fontWeight: 600, fontSize: '0.875rem' }}>
                    Student Breakdown
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {examData.students.map((student) => (
                        <StudentResultRow key={student.id} student={student} />
                    ))}
                    {examData.students.length === 0 && (
                        <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No evaluation data available. Go to "Evaluate Answers" to start.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
