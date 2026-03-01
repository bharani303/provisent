import React, { createContext, useContext, useState, useEffect } from 'react';

const FlowContext = createContext({
    isReady: false,
    markReady: () => { }
});

export const FlowProvider = ({ children }) => {
    // If the user has already seen the modal in this session, we start ready.
    const [isReady, setIsReady] = useState(() => {
        return !!sessionStorage.getItem('provisent_lead_seen');
    });

    const markReady = () => {
        setIsReady(true);
    };

    return (
        <FlowContext.Provider value={{ isReady, markReady }}>
            {children}
        </FlowContext.Provider>
    );
};

export const useFlow = () => useContext(FlowContext);
