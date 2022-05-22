import { types } from "../types/types";

/**
 * @module Reducers
 */

const initialState = {
    isCheking: false,
}

/**
 * Reducer de autentificacion
 * @param {Object} state Objecto de estado de la autentificacion
 * @param {Object} action Objecto para cambiar el estado de la autentificacion
 * @returns {Object} Estado actual de la autentificacion
 */

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                isCheking: false,
                ...action.payload
            }
        case types.authCheckingFinish:
            return {
                ...state,
                isCheking: true,
            }
        case types.logout:
            return{
                isCheking: true
            }
        case types.authChecking:
            return {
                isCheking: true,
            }
        default:
            return state;
    }
}

export {authReducer};