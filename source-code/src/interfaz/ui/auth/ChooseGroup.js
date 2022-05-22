import React, { useRef } from 'react'
import {useDispatch } from 'react-redux'
import { startLogin } from '../../../action/auth';
import { fetchSinToken } from '../../../helpers/fetch';
import { types } from '../../../types/types';

export const ChooseGroup = ({groups,data}) => {
    const select = useRef(null)
    const dispatch = useDispatch();
    const selectGroup=async ()=>{
        const codeAndName=select.current.value.split(',');
        if(codeAndName[0]===types.groupId){
            const resp = await fetchSinToken('login', data, 'POST');
            const body = await resp.json();
            return dispatch(startLogin(body,codeAndName[0]));
        }
        window.location.href=`https://${codeAndName[1]}.qonteo.com/`;
    }
    return (
        <div className="chooseGroup">
            <select ref={select} name="groupNumber">
                <option hidden >Seleccione un grupo</option>
                {groups.map((g, i) => (
                    <option key={i} value={[g.id,g.name]}>{g.code}</option>
                ))}
            </select>
            <button className="btn choose" onClick={selectGroup} >Ir</button>
        </div>
    )
}
