import React, {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/auth/verify`, {
            method: 'GET',
            credentials: 'include',
        });
        const responseJSON = await response.json();

        if(response.ok){
            setIsAuthenticated(true);
            setUser(responseJSON);
        }else {
            setIsAuthenticated(false);
        }
    };

    useEffect(()=> {
        checkAuth();
    }, []);

    return(
        <AuthContext.Provider value={{user, checkAuth, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    return (
        useContext(AuthContext)
    )
};