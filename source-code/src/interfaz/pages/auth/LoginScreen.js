import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { startLogin } from '../../../action/auth';
import { fetchSinToken } from '../../../helpers/fetch';
import { useForm } from '../../../hooks/useForm';
import { Header } from '../../ui/utils/auth/Header';
import { useDispatch } from 'react-redux';
import { ChooseGroup } from '../../ui/auth/ChooseGroup';
import Swal from 'sweetalert2';
import { types } from '../../../types/types';
export const LoginScreen = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [countGroup, setcountGroup] = useState([])

    const dispatch = useDispatch();

    const [fields, inputChange] = useForm({
        email: '',
        password: ''
    })
    const { email, password } = fields;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email !== '' && password !== '') {
                setIsLoading(true);
                const resp = await (await fetchSinToken('login', fields, 'POST')).json();
                if (!!resp.errors) {
                    setIsLoading(false);
                    return Swal.fire('Error', 'Las credenciales son invalidas', 'error');
                };

               
                const { user: { groups } } = resp;
                console.log()
                 setIsLoading(false);
                if (groups.length === 0 || !groups) return setError('No tiene acceso a este sitio')
                if (groups.length === 1 && groups[0].name !== 'unicentro') return setError('No pertenece a este grupo')
                if (groups.length === 1 && groups[0].name === 'unicentro') return dispatch(startLogin(resp));

                setIsSelect(true);
                setcountGroup(groups);
                return;
            }
            Swal.fire('Error', 'Los campos no pueden estar vacios', 'error')

        } catch (error) {
            throw new Error('ocurrio un error al realizar la peticion')
        }


    }


    return (
        <Header>
            <div className="contenedor">
                {!isSelect
                    ? (
                        <>
                            <span className="error spaceTopSmall d-block text-center">{error && error}</span>
                            <form onSubmit={handleLogin} className="formLogin spaceBottomSmall" >
                                <input type="text" name="email"
                                    onChange={inputChange}
                                    placeholder="Correo electrónico"
                                    value={email}
                                />
                                <input type="password"
                                    name="password"
                                    onChange={inputChange}
                                    placeholder="Contraseña"
                                    value={password}
                                />
                                <div className="forgotPass text-rigth">
                                    <span className="link " >¿Olvidaste tu contraseña?</span>
                                </div>

                                <input type="submit" value={isLoading ? 'Cargando...' : 'Iniciar Sesíon'} className="btn btn-login" />
                                <NavLink className="link mtSmall text-center w-100 d-block" to="/auth/registrarse">Registrarse</NavLink>
                            </form>
                        </>
                    )
                    :
                    (
                        <ChooseGroup groups={countGroup} data={fields} />
                    )
                }
            </div>
        </Header>
    )
}
