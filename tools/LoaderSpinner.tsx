import React from 'react'
const LoaderSpinner = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div
                className="size-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"
            ></div>
        </div>
    );
}
export default LoaderSpinner;