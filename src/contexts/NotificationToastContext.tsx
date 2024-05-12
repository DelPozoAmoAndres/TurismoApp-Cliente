import NotificationToast from '@shared/NotificationToast';
import React, { createContext, useState } from 'react';

type NotificationContextType = {
    showNotification: (notification: string, position?: 'top' | 'bottom' | 'middle', duration?: number) => void;
};

const NotificationContextDefaultValues: NotificationContextType = {
    showNotification: () => { console.error("showNotification function not yet initialized") }
};

export const NotificationContext = createContext(NotificationContextDefaultValues);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState("");
    const [position, setPosition] = useState<'top' | 'bottom' | 'middle'>('top');
    const [duration, setDuration] = useState(500);
    const [active, setActive] = useState(false);

    const showNotification = (notification: string, position: 'top' | 'bottom' | 'middle' = "top", duration: number) => {
        setNotification(notification);
        setPosition(position);
        setDuration(duration ? duration : 500);
        setActive(true);
    }

    return (
        <NotificationContext.Provider value={{ showNotification } as any}>
            <NotificationToast message={notification} duration={duration} position={position} setActive={setActive} active={active} />
            {children}
        </NotificationContext.Provider>
    );
};