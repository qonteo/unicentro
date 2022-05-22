import { types } from "../types/types"

/**
 * @module Reducers
 */

const initialize = {
  hoursPersonTotal:[],
  hoursPersonMale:[],
  hoursPersonFemale:[],
  weekPersonTotal:[],
  weekPersonMale:[],
  weekPersonFemale:[],
  monthPersonTotal:[],
  monthPersonMale:[],
  monthPersonFemale:[],
  heatmapPersonTotal:[],
  heatmapPersonRange:[],
  rangePersonAges:[],
  maxHourPersonTotal:{},
  maxHourPersonMale:{},
  maxHourPersonFemale:{},
  maxWeekPersonTotal:{},
  maxWeekPersonMale:{},
  maxWeekPersonFemale:{},
  maxMonthPersonTotal:{},
  maxMonthPersonMale:{},
  maxMonthPersonFemale:{},

}


/**
 * Reducer de datos por horas, semanas y meses
 * @param {Object} state Objecto de estado de los datos por tiempo y fechas
 * @param {Object} action action Objecto para cambiar el estado de los datos por tiempo y fechas
 * @returns {Object} Estado actual de los datos por tiempo y fechas
 */

const personReducer = (state = initialize, action) => {
  switch (action.type) {
    case types.initializePerson:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export {personReducer}