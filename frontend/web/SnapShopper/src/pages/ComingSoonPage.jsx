import React from 'react'

const ComingSoonPage = () => {
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block bg-yellow-500 text-white rounded-full p-4 mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-12a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Page Under Construction</h1>
                <p className="text-gray-600 mt-4">
                    We're working hard to bring you something amazing. Stay tuned!
                </p>
                
            </div>
        </div>
    );
};

export default ComingSoonPage