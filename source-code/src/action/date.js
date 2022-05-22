import { types } from "../types/types"

/**
 * @module Actions
 */

/**
 * Action para enviar una fecha
 * @param {String} start fecha de inicio para los datos
 * @param {String} startvalue fecha de inico con Formato
 * @param {String} end fecha de fin
 * @param {String} endvalue fecha de fin con Formato
 */
export const setDate=(start,startvalue,end,endvalue) => ({
    type: types.changeDate,
    start,
    startvalue,
    end,
    endvalue
})