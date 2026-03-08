import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Camera, Upload, UserPlus, Trash2, ArrowLeft, PlayCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const UploadAnswersPage = () => {
    const navigate = useNavigate();
    const { examData, updateExamData } = useAppContext();
    const [students, setStudents] = useState(examData.students.length > 0 ? examData.students : []);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentRoll, setNewStudentRoll] = useState('');

    const addStudent = () => {
        if (newStudentName && newStudentRoll) {
            setStudents([...students, {
                name: newStudentName,
                roll: newStudentRoll,
                id: Date.now(),
                status: 'ready',
                files: []
            }]);
            setNewStudentName('');
            setNewStudentRoll('');
        }
    };

    const removeStudent = (id) => {
        setStudents(students.filter(s => s.id !== id));
    };

    const handleStartEvaluation = () => {
        updateExamData({ students });
        navigate('/evaluate');
    };

    return (
        <div>
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <Link to="/upload-question" style={{ color: 'var(--primary-color)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: 'var(--spacing-md)' }}>
                    <ArrowLeft size={16} /> Back to Evaluation Settings
                </Link>
                <h1 style={{ fontSize: '1.75rem', margin: 'var(--spacing-xs) 0' }}>Capture Answer Sheets</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Capture photos or upload student answer sheets for {examData.subject || 'the exam'}.</p>
            </div>

            <div className="grid grid-cols-2">
                <div className="card">
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Add Student</h3>
                    <div className="form-group">
                        <label className="form-label">Student Name</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. John Doe"
                            value={newStudentName}
                            onChange={(e) => setNewStudentName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Roll Number</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g. CS101"
                            value={newStudentRoll}
                            onChange={(e) => setNewStudentRoll(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-outline"
                        style={{ width: '100%', gap: '8px', marginTop: 'var(--spacing-sm)' }}
                        onClick={addStudent}
                        disabled={!newStudentName || !newStudentRoll}
                    >
                        <UserPlus size={18} /> Add Student to List
                    </button>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <h3>Student Queue ({students.length})</h3>
                        {students.length > 0 && (
                            <button
                                className="btn btn-primary"
                                style={{ gap: '8px' }}
                                onClick={handleStartEvaluation}
                            >
                                <PlayCircle size={18} /> Start AI Evaluation
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        {students.map((student) => (
                            <div
                                key={student.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 'var(--spacing-md)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <div>
                                    <div style={{ fontWeight: 600 }}>{student.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ID: {student.roll}</div>
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                    <button className="btn btn-outline" style={{ padding: '8px', minWidth: 'auto' }} title="Open Camera">
                                        <Camera size={16} />
                                    </button>
                                    <button className="btn btn-outline" style={{ padding: '8px', minWidth: 'auto' }} title="Upload Files">
                                        <Upload size={16} />
                                    </button>
                                    <button
                                        className="btn btn-outline"
                                        style={{ padding: '8px', minWidth: 'auto', color: 'var(--error-color)' }}
                                        onClick={() => removeStudent(student.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {students.length === 0 && (
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--text-secondary)' }}>
                                No students added yet. Use the form to the left to start your queue.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadAnswersPage;
