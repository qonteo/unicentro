import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types"

/**
 * @module Actions
 */

/**
 * funcion para traer los datos de Trazabilidad
 * @returns callback con los datos
 */
const getTrazabilidad = () => {
    return async (dispatch,getState) => {
        const { groups } = getState().auth;
        const groupId = groups.filter(g => g.code === types.groupName)[0].id;
        const resp = await (await fetchConToken(`/resources/tracking?group_id=${groupId}`)).json();
        const { resources, hours } = resp

        dispatch(initTrazabilidad({
            resources,
            hours
        }))
    }
}

/**
 * funcion para inizializar los datos de tranzabilidad
 * @param {Object} data resources y hots de trazabilidad
 */
const initTrazabilidad = (data) => ({
    type: types.initialDataTrazabilidad,
    payload: data
})

/**
 * funcion para traer los datos por las hora
 * @param {Object} payload 
 */
const setTrazabilidadByHour = (payload) => ({
    type: types.changeTrazabilidadByHour,
    payload
})

export{
    getTrazabilidad,
    setTrazabilidadByHour
}