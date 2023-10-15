import React from 'react';
import './SuccessPage.css'; // Import the CSS file

interface SuccessProps {
    message: string;
}

export const SuccessPage: React.FC<SuccessProps> = ({ message }) => {
    return (
        <div className="success">
            <p>{message}</p>
        </div>
    );
};
