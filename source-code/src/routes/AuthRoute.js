import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginScreen } from '../interfaz/pages/auth/LoginScreen'
import { RegisterScreen } from '../interfaz/pages/auth/RegisterScreen'

export const AuthRouter = () => {
    return (
        <>
            <div>
                <Switch>
                    <Route exact path="/auth/login" component={LoginScreen} />
                    <Route exact path="/auth/registrarse" component={RegisterScreen} />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </>
    )
}
