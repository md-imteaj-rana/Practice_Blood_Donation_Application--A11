import React, { useContext } from 'react'

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoutes = ({children}) => {
    const {user, loading, roleLoading, status} = useContext(AuthContext)

    const location = useLocation()

    if(loading || roleLoading){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if(user && status == 'active'){
        return children
    }

    return <Navigate state={location.pathname} to='/Login'></Navigate>

};

export default PrivateRoutes