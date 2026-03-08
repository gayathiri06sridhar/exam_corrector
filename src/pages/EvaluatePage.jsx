import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const EvaluatePage = () => {
    const navigate = useNavigate();
    const { examData, updateExamData } = useAppContext();
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [isProcessing, setIsProcessing] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (examData.students.length === 0) {
            navigate('/upload-answers');
            return;
        }

        let interval;
        if (isProcessing) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        if (currentStudentIndex < examData.students.length - 1) {
                            setCurrentStudentIndex(prevIdx => prevIdx + 1);
                            return 0;
                        } else {
                            setIsProcessing(false);
                            clearInterval(interval);
                            finishEvaluation();
                            return 100;
                        }
                    }
                    return prev + 5;
                });
            }, 100);
        }

        return () => clearInterval(interval);
    }, [currentStudentIndex, isProcessing, examData.students]);

    const finishEvaluation = () => {
        const evaluatedStudents = examData.students.map(student => {
            // Mock AI Evaluation Logic based on strictness
            const baseScore = 70 + Math.random() * 25;
            let finalScore = baseScore;
            let feedback = [];

            if (examData.strictness === 'strict') {
                finalScore -= Math.random() * 15;
                feedback = ['Lacks technical terminology in Section B.', 'Syntax error in code snippet 2.', ' हैंडराइटिंग (Handwriting) could be clearer.'];
            } else if (examData.strictness === 'easy') {
                finalScore += Math.random() * 5;
                feedback = ['Great conceptual understanding!', 'Good effort on descriptive answers.', 'Keep up the good work.'];
            } else {
                feedback = ['Correct application of formulas.', 'Could improve diagrams in Question 4.', 'Balanced approach.'];
            }

            return {
                ...student,
                score: Math.min(100, Math.max(0, Math.floor(finalScore))),
                status: 'completed',
                feedback
            };
        });

        updateExamData({
            students: evaluatedStudents,
            evaluatedAt: new Date().toISOString()
        });

        // Auto-navigate to results after a short delay
        setTimeout(() => navigate('/results'), 1500);
    };

    const currentStudent = examData.students[currentStudentIndex];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>AI Evaluation in Progress</h2>

                <div style={{ position: 'relative', marginBottom: 'var(--spacing-xl)' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--spacing-sm)' }}>
                        Processing: {currentStudent?.name || 'Student'}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Analyzing handwriting and verifying answers against Question Paper...
                    </p>
                </div>

                <div style={{ width: '100%', backgroundColor: 'var(--border-color)', height: '12px', borderRadius: '6px', overflow: 'hidden', marginBottom: 'var(--spacing-md)' }}>
                    <div
                        style={{
                            width: `${progress}%`,
                            backgroundColor: 'var(--primary-color)',
                            height: '100%',
                            transition: 'width 0.1s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.625rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: 'var(--spacing-xl)' }}>
                    <span>Overall Progress</span>
                    <span>{Math.round(((currentStudentIndex + progress / 100) / examData.students.length) * 100)}%</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: progress > 20 ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                        {progress > 20 ? <CheckCircle2 size={16} /> : <Loader2 size={16} className="animate-spin" />}
                        <span style={{ fontSize: '0.875rem' }}>OCR Engine - Text Extraction</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: progress > 50 ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                        {progress > 50 ? <CheckCircle2 size={16} /> : <Loader2 size={16} className="animate-spin" />}
                        <span style={{ fontSize: '0.875rem' }}>Semantic Analysis - Compare with Solution Key</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: progress > 80 ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                        {progress > 80 ? <CheckCircle2 size={16} /> : <Loader2 size={16} className="animate-spin" />}
                        <span style={{ fontSize: '0.875rem' }}>Final Score Generation & Feedback</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvaluatePage;
