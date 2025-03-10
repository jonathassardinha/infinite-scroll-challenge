import React from 'react';

type SeeMoreButtonProps = {
    onClick: () => void;
};

const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({ onClick }) => {
    return (
        <div className="mt-12">
            <p className="text-4xl font-light mb-4">See more products</p>
            <button 
                className="bg-gray-200 px-8 py-2 rounded-full"
                onClick={onClick}
            >
                <img
                    src="/arrow-right.svg"
                    alt="Arrow right icon"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
};

export default SeeMoreButton;