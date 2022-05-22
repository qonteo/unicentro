import { types } from "../types/types";

/**
 * @module Reducers
 */

const initialState = {
    resources: [],
    hours: [],
}

/**
 * 
 * @param {Object} state Objecto de estado de los resources
 * @param {Object} action action Objecto para cambiar el estado de los resources
 * @returns {Object} Estado actual de los resources
 */

const trazabilidadReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.initialDataTrazabilidad:
            return {
                ...state,
                ...action.payload
            }
        case types.changeTrazabilidadByHour:
            return{
                ...state,
                resources:action.payload
            }
        default:
            return state;
    }
}

export {trazabilidadReducer}