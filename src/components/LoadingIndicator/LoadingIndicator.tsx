import React from 'react';

type LoadingIndicatorProps = {
    type?: 'spinner' | 'skeletons';
    count?: number;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
    type = 'spinner',
    count = 3
}) => {
    if (type === 'skeletons') {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="bg-gray-200 p-4 flex flex-col gap-4 w-fit animate-pulse">
                        <div className="flex items-center justify-between">
                            <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                            <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                        </div>
                        <div className="bg-gray-300 h-[300px] w-[400px]"></div>
                        <div className="bg-gray-300 p-3 gap-3 flex items-center">
                            <div className="w-full">
                                <div className="h-5 bg-gray-400 w-36 mb-2"></div>
                                <div className="h-4 bg-gray-400 w-24"></div>
                            </div>
                            <div className="w-px self-stretch bg-gray-400 ml-auto"></div>
                            <div className="h-6 w-6 bg-gray-400 ml-2 mr-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    
    // Default spinner
    return (
        <div className="flex justify-center items-center p-4 w-full" aria-label="Loading content">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default React.memo(LoadingIndicator);