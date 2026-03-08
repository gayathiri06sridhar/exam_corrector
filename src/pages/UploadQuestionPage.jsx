import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileUp, Save, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const UploadQuestionPage = () => {
    const navigate = useNavigate();
    const { examData, updateExamData } = useAppContext();
    const [subject, setSubject] = useState(examData.subject);
    const [strictness, setStrictness] = useState(examData.strictness);
    const [file, setFile] = useState(null);

    const handleSave = () => {
        updateExamData({ subject, strictness, questionPaper: file ? file.name : 'mock-paper.pdf' });
        navigate('/upload-answers');
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <Link to="/dashboard" style={{ color: 'var(--primary-color)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: 'var(--spacing-md)' }}>
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
                <h1 style={{ fontSize: '1.75rem', margin: 'var(--spacing-xs) 0' }}>Upload Question Paper</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Provide the source material for AI evaluation.</p>
            </div>

            <div className="grid grid-cols-2">
                <div className="card">
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>1. Question Paper File</h3>
                    <div
                        style={{
                            border: '2px dashed var(--border-color)',
                            padding: 'var(--spacing-xl)',
                            textAlign: 'center',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: file ? '#eaf4ff' : '#fafafa',
                            marginBottom: 'var(--spacing-lg)',
                            borderColor: file ? 'var(--primary-color)' : 'var(--border-color)'
                        }}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                            <FileUp size={48} color={file ? 'var(--primary-color)' : 'var(--secondary-color)'} style={{ margin: '0 auto' }} />
                        </div>
                        {file ? (
                            <>
                                <p style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{file.name}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{(file.size / 1024).toFixed(2)} KB</p>
                            </>
                        ) : (
                            <>
                                <p style={{ fontWeight: 500, marginBottom: 'var(--spacing-sm)' }}>Drag and drop PDF/Image here</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: 'var(--spacing-lg)' }}>Max file size: 10MB</p>
                            </>
                        )}
                        <label htmlFor="file-upload" className="btn btn-outline" style={{ cursor: 'pointer', marginTop: file ? 'var(--spacing-md)' : '0' }}>
                            {file ? 'Change File' : 'Browse Files'}
                        </label>
                        <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Subject Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. Advanced Calculus"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>2. Evaluation Settings</h3>

                    <div className="form-group">
                        <label className="form-label">Strictness Level</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {[
                                { id: 'easy', label: 'Easy', desc: 'Focus on conceptual understanding, lenient with syntax/spelling.' },
                                { id: 'medium', label: 'Medium (Default)', desc: 'Balanced evaluation across all parameters.' },
                                { id: 'strict', label: 'Strict', desc: 'Rigorous check for accuracy, terminology, and presentation.' },
                            ].map((level) => (
                                <label
                                    key={level.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-sm)',
                                        cursor: 'pointer',
                                        padding: 'var(--spacing-sm)',
                                        border: '1px solid',
                                        borderColor: strictness === level.id ? 'var(--primary-color)' : 'var(--border-color)',
                                        backgroundColor: strictness === level.id ? 'rgba(26, 115, 232, 0.05)' : 'transparent',
                                        borderRadius: 'var(--radius-sm)',
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="strictness"
                                        value={level.id}
                                        checked={strictness === level.id}
                                        onChange={() => setStrictness(level.id)}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{level.label}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{level.desc}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--spacing-xl)' }}>
                        <button
                            onClick={handleSave}
                            className="btn btn-primary"
                            style={{ width: '100%', gap: '8px' }}
                            disabled={!subject}
                        >
                            <Save size={18} /> Save and Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadQuestionPage;
