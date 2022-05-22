import React from 'react'
import { NavLink } from 'react-router-dom'
import { Header } from '../../ui/utils/auth/Header'

export const RegisterScreen = () => {
    return (
        <Header>
             <div className="contenedor">
          

          <form /* onSubmit={handleLogin} */ className="formLogin spaceBottomSmall" >
          <input type="text"   name="rFirstname" id="firstname" autoComplete="off" placeholder="Nombre" />
            <input type="text"   name="rLastname" id="lastname" autoComplete="off" placeholder="Apellidos" />
              <input type="text" name="lEmail"
                 /*  onChange={inputChange } */
                  id="correolog"
                  placeholder="Correo electrónico"
                /*   value={lEmail} */
              />
              <input type="password"
                  name="lPassword"
                 /*  onChange={inputChange} */
                  id="contralog"
                  placeholder="Contraseña"
                 /*  value={lPassword} */

              />
            
              <input type="submit" value="Registrarse" className="btn btn-login" />
              <NavLink className="link mtSmall text-center w-100 d-block" to="/auth/login">Ingresar</NavLink>
          </form>
      </div>
        </Header>
    )
}
