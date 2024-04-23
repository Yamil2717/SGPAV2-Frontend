import React from 'react';

interface NotificationProps {
    message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
    return (
        <div className="fixed top-24 right-2 bg-green-900 text-white py-4 px-6 rounded-lg shadow-lg m-4 animate-bounce">
            <h2 className="text-lg font-bold mb-1 text-left">Notificación</h2>
            <p className="text-xl text-center">
                {message}
            </p>
        </div>
    );
};

export default Notification;