import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types"

/**
 * @module Actions
 */

/**
 * funcion para traer los datos de los totems
 * @returns callback con los totems
 */
const startToten=()=>{
    return async (dispatch,getState)=>{
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-person-totals?group_id=${groupId}`);
        const body = await resp.json();
        const {total:totemTotal,resources}=body;
        const tabs=resources.map(r=>{return {name:r.name,code:r.code}})
        const resourcesFinal=resources.map(r=>{return {...r.data}})
        dispatch(getToten({
            totemTotal,
            resources:resourcesFinal,
            tabs
        }))
    }
}

/**
 * funcion para inicializar los totems
 * @param {Object} data Los totems
 */
const getToten=(data)=>({
    type:types.getToten,
    payload:data
})

export{
    startToten
}