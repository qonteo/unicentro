import { types } from "../types/types";

/**
 * @module Reducers
 */

const init = {
    resources: [],
    totemTotal: {},
    tabs: []
}

/**
 * 
 * @param {Object} state Objecto de estado de los totens
 * @param {Object} action action Objecto para cambiar el estado de los totens
 * @returns {Object} Estado actual de los totens
 */

const totenReducer = (state = init, action) => {
    switch (action.type) {
        case types.getToten:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export default totenReducer