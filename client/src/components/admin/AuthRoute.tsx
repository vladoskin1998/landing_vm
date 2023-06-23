import React, { ReactElement, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ children }: { children: ReactElement }) => {

    const { isAuth } = useContext(AuthContext)

    return (
       isAuth ? children : <Navigate to="no-match" replace />
    );

}

export default AuthRoute