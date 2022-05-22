import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2'

import { format, isAfter, isEqual,isBefore,endOfMonth } from 'date-fns'


export const useDateReport = () => {
    const [startDateValue, setStartDateValue] = useState(new Date('2020-12-19'))
    const [endDateValue, setEndDateValue] = useState(new Date())
    const setStarDate = (date) => {
     
        
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
     
    }
    const setEndDate = (date) => {
        
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(startDateValue);
        const month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(startDateValue);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(startDateValue);
        const yearEnd = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const monthEnd = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(date);
        const dayEnd = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

        if (isBefore( new Date(yearEnd, monthEnd,dayEnd),new Date(year, month, day)) || isEqual(new Date(year, month, day), new Date(yearEnd, monthEnd, dayEnd))) {
            return Swal.fire('Error','La fecha fin debe ser mayor que la fecha de inicio','error')
        }
        setEndDateValue(date);

       
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

                />
            </div>
        </div>
    );

    return [DateHtml,startDateValue,endDateValue]
}
