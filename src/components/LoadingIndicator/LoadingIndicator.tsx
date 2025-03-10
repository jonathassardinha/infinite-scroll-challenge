import React from 'react';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="flex justify-center items-center p-4 w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
    );
};

export default LoadingIndicator;