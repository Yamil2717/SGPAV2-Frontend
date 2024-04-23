import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-auto my-8 ease-in-out">
            <div className='flex items-center justify-center gap-1'>
                <div className='h-4 w-4 bg-primary rounded-full animate-bounce'></div>
                <div className='h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            </div>
            <div className="text-center ml-2">
                <p className="text-white text-2xl animate-bounce [animation-delay:-0.15s] [animation-duration:1.25s]"> Cargando...</p>
            </div>
        </div>
    );
};

export default Loading;