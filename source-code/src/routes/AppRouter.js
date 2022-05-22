import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { LoginScreen } from '../interfaz/pages/auth/LoginScreen';
import { RegisterScreen } from '../interfaz/pages/auth/RegisterScreen';
import { PersonScreen } from '../interfaz/pages/desktop/person/PersonScreen';
import { useDispatch, useSelector } from 'react-redux'
import { startChecking } from '../action/auth'
import { PublicRoute } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import { TrazibilidadScreen } from '../interfaz/pages/desktop/person/TrazibilidadScreen';
import { MobileScreen } from '../interfaz/pages/mobile/MobileScreen';
import { isBrowser } from 'react-device-detect';
import { EspecificoScreen } from '../interfaz/pages/desktop/person/EspecificoScreen';
import { OperacionalScreen } from '../interfaz/pages/desktop/person/OperacionalScreen';
import { ComercialScreenReport } from '../interfaz/pages/desktop/reports/ComercialScreenRerpot';
import { EjecutivoScreenReport } from '../interfaz/pages/desktop/reports/EjecutivoScreenReport';
import { ComercialAuto } from '../auto-exports/ComercialAuto';
import { SensorScreen } from '../interfaz/pages/desktop/trazabilidad/SensorScreen';
import { ExportReport } from '../interfaz/pages/reports/ExportReport';
export const AppRouter = () => {
    const dispatch = useDispatch();
    const { isCheking,uid } = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    
    if(!isCheking){
        return <h3>Cargando...</h3>
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={!!uid} path="/auth/login" exact component={LoginScreen} />
                    <PublicRoute isAuthenticated={!!uid} exact path="/auth/registrarse" component={RegisterScreen} />
                    <PrivateRouter isAuthenticated={!!uid} path="/" exact component={isBrowser ? PersonScreen : MobileScreen} />
                    <PrivateRouter isAuthenticated={!!uid} exact path="/reportes/especifico" component={EspecificoScreen} />
                    <PrivateRouter isAuthenticated={!!uid} exact path="/reportes/operacional" component={OperacionalScreen} />
                    <PrivateRouter isAuthenticated={!!uid} exact path="/reportes-screen/comercial" component={ComercialScreenReport} />
                    <PrivateRouter isAuthenticated={!!uid} exact path="/reportes-screen/ejecutivo" component={EjecutivoScreenReport} />
                    <PrivateRouter isAuthenticated={!!uid} exact path="/trazabilidad/comercio" component={TrazibilidadScreen} />
                    <PrivateRouter isAuthenticated={!!uid} exact path="/sensor/:name" component={SensorScreen} />
                    <Route exact path="/export-test" component={ExportReport} />
                    <Redirect to="/" />
                </Switch>

            </div>
        </Router>
    )
}
