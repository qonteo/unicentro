import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { PersonScreen } from '../interfaz/pages/desktop/person/PersonScreen'
import { isBrowser } from 'react-device-detect'
import { MobileScreen } from '../interfaz/pages/mobile/MobileScreen'
import { EspecificoScreen } from '../interfaz/pages/desktop/person/EspecificoScreen'
import { ComercialScreenReport } from '../interfaz/pages/desktop/reports/ComercialScreenRerpot'
import { OperacionalScreen } from '../interfaz/pages/desktop/person/OperacionalScreen'
import { EjecutivoScreenReport } from '../interfaz/pages/desktop/reports/EjecutivoScreenReport'
import { TrazibilidadScreen } from '../interfaz/pages/desktop/person/TrazibilidadScreen'
import { ComercialAuto } from '../auto-exports/ComercialAuto'

export const DashboardRouter = () => {

    return (
        <>
            <div>
                <Switch>
                    <Route exact path="/" component={isBrowser ? PersonScreen : MobileScreen} />
                    <Route exact path="/reportes/especifico" component={EspecificoScreen} />
                    <Route exact path="/reportes/operacional" component={OperacionalScreen} />
                    <Route exact path="/reportes-screen/comercial" component={ComercialScreenReport} />
                    <Route exact path="/reportes-screen/ejecutivo" component={EjecutivoScreenReport} />
                    <Route exact path="/trazabilidad/comercio" component={TrazibilidadScreen} />
                    <Route exact path="/execute/comercial" component={ComercialAuto} />
                </Switch>
            </div>
        </>
    )
}
