import { fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

/**
 * @module Actions
 */

/**
 * Action para empezar el login
 * @param {Object} param0 token de usuario y el usuario
 * @param {Number} groupId id del grupo
 * @returns callBack con el dispatch del login
 */
const startLogin = ({ token, user }, groupId) => {
    return async (dispatch) => {

        localStorage.setItem('token-qonteo', `bear ${token}`);
        localStorage.setItem('id-user-qonteo', user._id);
        localStorage.setItem('group-id-qonteo', String(groupId));
        localStorage.setItem('token-init-date-qonteo', new Date().getTime());
        dispatch(login({
            uid: user._id,
            firstNames: user.firstNames,
            lastName: user.lastName,
            email: user.email,
            phonenumber: user.phonenumber,
            portraitUrl: user.portrait_url,
            country: user.country,
            groups: user.groups,
            city: user.city,
            isCheking: true
        }))
    }
}

/**
 * Action para empezar el cheking del login
 * @returns callback para logear o retornar al login
 */
const startChecking = (dispatch) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token-qonteo') || '';

        if (token.length > 0) {
            try {
                const resp = await (await fetchSinToken('token-renew')).json();
                if (Object.keys(resp).length > 0) {
                    const { user } = resp;
                    dispatch(login({
                        uid: user._id,
                        firstNames: user.firstNames,
                        lastName: user.lastName,
                        email: user.email,
                        phonenumber: user.phonenumber,
                        portraitUrl: user.portrait_url,
                        country: user.country,
                        city: user.city,
                        groups: user.groups,
                        isCheking: true
                    }))
                }
            } catch (error) {
                dispatch(checkingStart())
                console.log('error')
            }
        } else {
            dispatch(checkingStart())
        }
    }
}
const checkingStart = () => ({ type: types.authChecking })

const checkingFinish = () => ({ type: types.authCheckingFinish })

/**
 * Action para desloguear
 * @returns {Object} deslogueo
 */
const logout = () => ({ type: types.authChecking });

/**
 * Aciton para loguear usuario
 * @param {Object} user Datos del usuario
 * @returns {Object} loguear
 */
const login = (user) => ({
    type: types.authLogin,
    payload: user
})


export {
    startLogin,
    startChecking,
    checkingStart,
    checkingFinish,
    logout
}