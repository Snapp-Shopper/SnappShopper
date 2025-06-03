import React from 'react'
import { useLoading } from '../../context/LoadingContext';

const Spinner = ({
    size = 'lg',
    color = 'primary',
    speed = 'normal' }) => {

    //Color classes
    const colorClasses = {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-500',
        success: 'bg-green-500',
        danger: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-cyan-500',
    };

    // Size classes for individual dots
    const sizeClasses = {
        xs: 'w-1 h-1',
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4',
        xl: 'w-5 h-5',
    };

    // Speed classes
    const speedClasses = {
        slow: 'animate-bounce-slow',
        normal: 'animate-bounce',
        fast: 'animate-bounce-fast',
    };

    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                <div className={`rounded-full ${colorClasses[color]} ${sizeClasses[size]} ${speedClasses[speed]}`} style={{ animationDelay: '0ms' }}></div>
                <div className={`rounded-full ${colorClasses[color]} ${sizeClasses[size]} ${speedClasses[speed]}`} style={{ animationDelay: '300ms' }}></div>
                <div className={`rounded-full ${colorClasses[color]} ${sizeClasses[size]} ${speedClasses[speed]}`} style={{ animationDelay: '600ms' }}></div>
            </div>


            {/* <div className="flex space-x-2">
                <div className={`rounded-full ${colorClasses[color]} ${sizeClasses[size]} ${speedClasses[speed]}`} style={{ animationDelay: '0ms' }}></div>
                <div className={`rounded-full ${colorClasses[color]} ${sizeClasses[size]} ${speedClasses[speed]}`} style={{ animationDelay: '300ms' }}></div>
                <div className={`rounded-full ${colorClasses[color]} ${sizeClasses[size]} ${speedClasses[speed]}`} style={{ animationDelay: '600ms' }}></div>
            </div> */}
        </>
    )
}

export default Spinner