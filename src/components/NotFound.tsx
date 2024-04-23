import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl text-primary font-bold mb-4">404 - Página no encontrada</h1>
            <p className="text-lg text-white mb-8">Lo sentimos, la página que estás buscando no existe.</p>
            <button
                className="px-4 py-2 bg-secondary text-white rounded hover:bg-primary"
                onClick={handleGoHome}
            >
                Ir al inicio
            </button>
        </div>
    );
};

export default NotFound;