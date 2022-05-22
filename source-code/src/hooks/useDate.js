import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { format, isAfter, isEqual,isBefore,endOfMonth,subMonths,subDays,addDays } from 'date-fns'
import { setDate } from '../action/date';

/**
 * @module Hooks
 */

/**
 * 
 * @param {Function} method Dispatch a realizar por el botón
 * @param {String} totem variable para indicar el resource por la api
 * @param {String} gender variable para indicar el genero para los datos
 * @param {String} startDatekey fecha de inicio para los datos
 * @param {String} endDatekey fecha de fin para los datos
 * @param {String} idReset id reset para el div
 * @param {Boolean} month variable para mostrar el showMonthYearPicker
 * @returns {Array} Dates Picker, valores de inicio y fin y sus setters
 */

const useDate = (method,totem=0,gender,startDatekey,endDatekey,idReset,month=false) => {
    const dispatch = useDispatch();
    const date = useSelector( state => state.date );
    const [startDateValue, setStartDateValue] = useState( addDays(new Date(date[startDatekey]), 1))
    const [endDateValue, setEndDateValue] = useState(addDays(new Date(date[endDatekey]),1))

    const setStarDate = (date) => {
     
        const formatStartDate = format(date, 'yyyy-MM-dd');
        const formatEndDate = format(endDateValue, 'yyyy-MM-dd');
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        const yearEnd = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(endDateValue);
        const monthEnd = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(endDateValue);
        const dayEnd = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(endDateValue);
        if (isAfter(new Date(year, month, day), new Date(yearEnd, monthEnd, dayEnd)) || isEqual(new Date(year, month, day), new Date(yearEnd, monthEnd, dayEnd))) {
            return Swal.fire('Error','La fecha Inicio debe ser menor que la fecha de fin','error')
        }
        setStartDateValue(date);
        dispatch(method(formatStartDate, formatEndDate,totem,gender));
        dispatch(setDate(startDatekey,formatStartDate,endDatekey,formatEndDate))
    }
    const setEndDate = (date) => {
        const formatStartDate = format(startDateValue, 'yyyy-MM-dd');
        const formatEndDate = format(date, 'yyyy-MM-dd');
        const yearStart = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(startDateValue);
        const monthStart = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(startDateValue);
        const dayStart = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDateValue);
        const yearEnd = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const monthEnd = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
        const dayEnd = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        if (isBefore( new Date(yearEnd, monthEnd,dayEnd),new Date(yearStart, monthStart, dayStart)) || isEqual(new Date(yearStart, monthStart, dayStart), new Date(yearEnd, monthEnd, dayEnd))) {
            return Swal.fire('Error','La fecha fin debe ser mayor que la fecha de inicio','error')
        }
        setEndDateValue(date);

        dispatch(method(formatStartDate, formatEndDate,totem,gender));
        dispatch(setDate(startDatekey,formatStartDate,endDatekey,formatEndDate))
    }

    const DateHtml = () => (
        <div className="filterDate">
            <div className="date">
                <img src="/assets/images/icons/calendar.png" className="icon_inputS" alt="icon calendario" />
                <DatePicker
                    selected={startDateValue}
                    /*     locale="es" */
                    onChange={setStarDate}
                    format='yyyy-MM-dd'
                    maxDate={new Date()}
                    showMonthYearPicker={month}
                />
            </div>
            <div className="date">
                <img src="/assets/images/icons/calendar.png" className="icon_inputS" alt="icon calendario" />
                <DatePicker
                    selected={endDateValue}
                    /*  locale="es" */
                    onChange={setEndDate}
                    format='yyyy-MM-dd'
                    maxDate={new Date()}
                    showMonthYearPicker={month}

                />
            </div>
        </div>
    );
    return [DateHtml,startDateValue,endDateValue,setStartDateValue,setEndDateValue];
}

export {useDate}