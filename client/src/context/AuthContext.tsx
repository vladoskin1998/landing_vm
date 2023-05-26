import { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import { $authApi } from '../api/api';
import { DecodedToken } from '../types/types';
import { AppContext } from './AppContext';

const AuthContext = createContext<{
    isAuth: string;
    setIsAuth: (a: string) => void;
    loginAuth: ({ login, password }: { login: string, password: string }) => Promise<void>;
    logoutAuth: () => void;

}>({
    isAuth: localStorage.getItem('token') || '',
    setIsAuth() { },
    loginAuth() { return Promise.resolve(); },
    logoutAuth() { },
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem('token') || '');
    const { setLoader } = useContext(AppContext)

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            const decodedToken: DecodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                setIsAuth('');
            }
        }
        localStorage.setItem('token', isAuth);
    }, [isAuth]);


    const loginAuth = async ({ login, password }: { login: string, password: string }) => {
        setLoader(true)
        $authApi.post('login', { login, password },)
            .then(m => {
                localStorage.setItem('token', m.data);
                setIsAuth(m.data);
                setLoader(false)
            })
            .catch(error => {
                setLoader(false)
                alert(error?.response?.data?.message || 'Error occurred login');
            },
            );
    };

    const logoutAuth = () => {
        setLoader(true)
        $authApi.post('logout',
            { token: localStorage.getItem('token') },
        ).then(() => {
            setIsAuth('')
            setLoader(false)
        })
            .catch(error => {
                setLoader(false)
                alert(error?.response?.data?.message || 'Error occurred logoutAuth');
            },
            );
    };

    return <AuthContext.Provider value={
        {
            isAuth,
            setIsAuth,
            loginAuth,
            logoutAuth,
        }
    }>
        {children}
    </AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
