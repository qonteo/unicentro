import { types } from "../types/types";
import { format,endOfMonth ,subDays,startOfMonth,subMonths} from 'date-fns'

/**
 * @module Reducers
 */

const initialize = {
    dateStartHourPerson:format(subDays(new Date(),7),'yyyy-MM-dd'),
    dateEndHourPerson: format(new Date(),'yyyy-MM-dd'),
    dateStartHourMalePerson:format(subDays(new Date(),7),'yyyy-MM-dd'),
    dateEndHourMalePerson: format(new Date(),'yyyy-MM-dd'),
    dateStartHourFemalePerson: format(subDays(new Date(),7),'yyyy-MM-dd'),
    dateEndHourFemalePerson: format(new Date(),'yyyy-MM-dd'),
    dateStartWeekPerson: format(subDays(new Date(),7),'yyyy-MM-dd'),
    dateEndWeekPerson: format(new Date(),'yyyy-MM-dd'),
    dateStartWeekMalePerson: format(subDays(new Date(),7),'yyyy-MM-dd'),
    dateEndWeekMalePerson: format(new Date(),'yyyy-MM-dd'),
    dateStartWeekFemalePerson:format(subDays(new Date(),7),'yyyy-MM-dd'),
    dateEndWeekFemalePerson: format(new Date(),'yyyy-MM-dd'),
    dateStartMonthPerson: format(subMonths(new Date(),1), 'yyyy-MM-dd'),
    dateEndMonthPerson: format(new Date(),'yyyy-MM-dd'),
    dateStartMonthMalePerson: format(subMonths(new Date(),1), 'yyyy-MM-dd'),
    dateEndMonthMalePerson: format(new Date(),'yyyy-MM-dd'),
    dateStartMonthFemalePerson: format(subMonths(new Date(),1), 'yyyy-MM-dd'),
    dateEndMonthFemalePerson: format(new Date(),'yyyy-MM-dd'),
    dateStartHeatMap:format(subDays(new Date(),7),'yyyy-MM-dd'),
    dateEndHeatMap:format(new Date(),'yyyy-MM-dd'),
    dateStartAgePerson: format(subDays(new Date(),7),'yyyy-MM-dd'),
    dateEndAgePerson:format(new Date(),'yyyy-MM-dd'),
}

/**
 * Reducer de las fechas de inicio y fin
 * @param {Object} state Objecto de estado de los fechas inicio y fin
 * @param {Object} action action Objecto para cambiar el estado de los fechas inicio y fin
 * @returns {Object} Estado actual de los fechas inicio y fin
 */

const dateReducer=(state=initialize,action)=>{
    switch (action.type) {
        case types.changeDate:
            return {
                ...state,
                [action.start]:action.startvalue,
                [action.end]:action.endvalue
            }
        case types.resetDates:
            return initialize
        default:
            return state;
    }
}

export {dateReducer}