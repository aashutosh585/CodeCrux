import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContent = createContext();

export const AppContextProvider = (props)=>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(false);

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
            if(data.success) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            console.error('Auth state error:', error);
            toast.error('Connection error. Please try again.');
        }
    };

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/data');
            data.success ? setUserData(data.userData) : toast.error(data.message);
        } catch (error) {
            console.error('getUserData error:', error);
            toast.error(error.message);
        }
    }

    // Fetch sheets and tutorials from backend
    const getSheets = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/public/sheets');
            return data.success ? data.sheets : [];
        } catch (error) {
            console.error('getSheets error:', error);
            return [];
        }
    }

    const getTutorials = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/public/tutorials');
            return data.success ? data.tutorials : [];
        } catch (error) {
            console.error('getTutorials error:', error);
            return [];
        }
    }

    // Toggle completion functions
    const toggleSheetCompletion = async (sheetId) => {
        if (!isLoggedIn) {
            toast.error('Please login to track your progress');
            return;
        }
        
        try {
            const { data } = await axios.post(backendUrl + '/api/user/toggle-sheet', {
                sheetId: sheetId
            });
            
            if (data.success) {
                toast.success(data.message);
                getUserData(); // Refresh user data
                return data;
            } else {
                toast.error(data.message || 'Failed to update sheet progress');
            }
        } catch (error) {
            console.error('toggleSheetCompletion error:', error);
            toast.error('Failed to update sheet progress');
        }
    }

    const toggleTutorialCompletion = async (tutorialId) => {
        if (!isLoggedIn) {
            toast.error('Please login to track your progress');
            return;
        }
        
        try {
            const { data } = await axios.post(backendUrl + '/api/user/toggle-tutorial', {
                tutorialId: tutorialId
            });
            
            if (data.success) {
                toast.success(data.message);
                getUserData(); // Refresh user data
                return data;
            } else {
                toast.error(data.message || 'Failed to update tutorial progress');
            }
        } catch (error) {
            console.error('toggleTutorialCompletion error:', error);
            toast.error('Failed to update tutorial progress');
        }
    }

    useEffect(() => {
        getAuthState();
    }, []);

    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        getSheets,
        getTutorials,
        toggleSheetCompletion,
        toggleTutorialCompletion
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
}