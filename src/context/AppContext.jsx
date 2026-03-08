import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const [examData, setExamData] = useState(() => {
        const saved = localStorage.getItem('examData');
        return saved ? JSON.parse(saved) : {
            subject: '',
            strictness: 'medium',
            questionPaper: null,
            students: [],
            evaluatedAt: null
        };
    });

    useEffect(() => {
        localStorage.setItem('examData', JSON.stringify(examData));
    }, [examData]);

    const updateExamData = (newData) => {
        setExamData(prev => ({ ...prev, ...newData }));
    };

    const resetExam = () => {
        setExamData({
            subject: '',
            strictness: 'medium',
            questionPaper: null,
            students: [],
            evaluatedAt: null
        });
    };

    return (
        <AppContext.Provider value={{ user, setUser, examData, updateExamData, resetExam }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
