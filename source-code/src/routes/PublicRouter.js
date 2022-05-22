import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { LoginScreen } from '../interfaz/pages/auth/LoginScreen';
import { PersonScreen } from '../interfaz/pages/desktop/person/PersonScreen';

export const PublicRoute =({component: Component,isAuthenticated, ...rest}) => {

    
    return(
        <>
        {isAuthenticated ? <Redirect to="/" />   :  <Route  {...rest} render={props => (
            <Component {...props} />  
    )}  />}
    </>
    )
    }
    