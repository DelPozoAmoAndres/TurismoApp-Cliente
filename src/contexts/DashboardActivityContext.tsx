
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardActivityContextProps {
    showEvents: boolean;
    startDate: string;
    endDate: string;
    includeCancelled: boolean;
    menuForceUpdate: boolean;
    setShowEvents: (value: boolean) => void;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    setIncludeCancelled: (value: boolean) => void;
    setMenuForceUpdate: (value: boolean) => void;
}

const DashboardActivityContext = createContext<DashboardActivityContextProps | undefined>(undefined);

export const useMenuContext = () => {
    const context = useContext(DashboardActivityContext);
    if (!context) {
        throw new Error('useMenuContext must be used within a MenuProvider');
    }
    return context;
};

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showEvents, setShowEvents] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [includeCancelled, setIncludeCancelled] = useState(false);
    const [menuForceUpdate, setMenuForceUpdate] = useState(false);

    return (
        <DashboardActivityContext.Provider value={{ showEvents, startDate, endDate, includeCancelled, menuForceUpdate, setShowEvents, setStartDate, setEndDate, setIncludeCancelled, setMenuForceUpdate }}>
            {children}
        </DashboardActivityContext.Provider>
    );
};
