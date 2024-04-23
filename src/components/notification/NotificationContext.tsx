import React, { createContext, useState, useContext } from 'react';
import Notification from './Notification';

interface NotificationContextProps {
    message: string | null;
    showMessage: (message: string) => void;
}

interface NotificationProviderProps {
    children: React.ReactNode;
}

const NotificationContext = createContext<NotificationContextProps>({
    message: null,
    showMessage: () => { },
});

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [message, setMessage] = useState<string | null>(null);

    const showMessage = (message: string) => {
        setMessage(message);

        setTimeout(() => {
            setMessage(null);
        }, 5000);
    };

    return (
        <NotificationContext.Provider value={{ message, showMessage }}>
            {children}
            {message && <Notification message={message} />}
        </NotificationContext.Provider>
    );
};