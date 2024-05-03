import React from 'react';
import { IonToast } from '@ionic/react';

interface NotificationToastProps {
    message: string;
    duration: number;
    position: 'top' | 'bottom' | 'middle';
    active: boolean;
    setActive: (arg0: boolean) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, duration, position, active, setActive }) => {
    return (
        <IonToast
            isOpen={active}
            message={message}
            onDidDismiss={() => { console.log('ResetToast'); setActive(false) }}
            duration={duration}
            position={position}
        />
    );
};

export default NotificationToast;