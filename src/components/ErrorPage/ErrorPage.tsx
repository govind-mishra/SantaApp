// ErrorComponent.tsx
import React from 'react';
import './ErrorPage.css';

interface ErrorProps {
    message: string;
}

export const ErrorPage: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="error">
            <p>{message}</p>
        </div>
    );
};

