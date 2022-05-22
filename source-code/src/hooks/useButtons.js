import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { subDays, format, addDays } from 'date-fns'
import { setDate } from '../action/date';

/**
 * @module Hooks
 */

const currentDate = format(new Date(), 'yyyy-MM-dd');

/**
 * 
 * @param {object} buttons Contenido de los botones
 * @param {Function} method Dispatch a realizar por el botón
 * @param {String} totem variable para indicar el resource por la api
 * @param {String} gender variable para indicar el genero para los datos
 * @param {String} startDatekey fecha de inicio para los datos
 * @param {String} endDatekey fecha de fin para los datos
 * @param {String} idReset id reset para el div
 * @param {Number} indexInicial inddicador del boton en el arrreglo
 * @param {*} setdate funcion para enviar la fecha
 * @param {*} setenddate funcion para enviar la fecha de fin
 * @returns {Array} Botones y el reset
 */

const useButtons = (buttons = {}, method, totem = 0, gender, startDatekey, endDatekey, idReset, indexInicial = 0, setdate = false, setenddate = false) => {
    const [isActive, setIsActive] = useState(Object.keys(buttons)[indexInicial])

    const dispatch = useDispatch();
    const setRangeDate = (element, date_to) => {
        if (element.classList.contains('active')) return false;
        const filterDate = subDays(new Date(), date_to);
        const formatDateFilter = format(filterDate, 'yyyy-MM-dd');

        dispatch(method(formatDateFilter, currentDate, totem, gender))
        if (setdate) {
            setdate(new Date(filterDate))
            setenddate(addDays(new Date(currentDate), 1))
        }
        setIsActive(date_to);
        dispatch(setDate(startDatekey, formatDateFilter, endDatekey, currentDate))
    }

    const reset = () => {
        setIsActive(Object.keys(buttons)[1])
    }
    const ButtonsHtml = () => (
        <div reset={idReset + 'rst'} className="groupButtons text-center spaceBottom">
            {Object.keys(buttons).map((v, _i) => (
                <button key={_i} onClick={({ target }) => setRangeDate(target, v)} className={`filterBtn ${v === isActive ? 'active' : ''}`}>{buttons[v]}</button>
            ))}
        </div>

    )

    return [ButtonsHtml, reset]
}

export {useButtons}