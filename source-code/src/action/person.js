import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import {subDays,format,subMonths,startOfMonth} from 'date-fns'
import Swal from 'sweetalert2'

/**
 * @module Actions
 */
const currentDate = format(new Date(), 'yyyy-MM-dd');
const currentSevenDay = format(subDays(new Date(),7), 'yyyy-MM-dd');
const lastMonth = format(subMonths(new Date(),1), 'yyyy-MM-dd');


/**
 * 
 * @param {String} toten toten de los datos requeridos
 * @returns callback que guarda los datos en el state
 */
const startPersonData = (toten = '') => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        try {
            const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
            const resp =await (await fetchConToken(`/get-person-graphics?heatmap_p=true&age_range_p=true&date_to=${currentDate}&date_from=${currentSevenDay}&resource=${toten}&group_id=${groupId}`)).json();
            const respMonth =await (await fetchConToken(`/get-person-graphics?heatmap_p=true&age_range_p=true&date_from=${lastMonth}&date_to=${currentDate}&resource=${toten}&group_id=${groupId}`)).json();
            const { hours, week, heatmap, heatmap_range, ageRanges, max_hour, max_hour_female, max_hour_male, max_week_day, max_week_day_female, max_week_day_male } = resp;
            const {  month, max_month_day, max_month_day_female, max_month_day_male } = respMonth;
            const monthPersonTotal = month.map(h => { return { label: h.day, x: h.day, y: h.total } });
            const monthPersonMale = month.map(h => { return { label: h.day, x: h.day, y: h.male } });
            const monthPersonFemale = month.map(h => { return { label: h.day, x: h.day, y: h.female } });


            const hoursPersonTotal = hours.map(h => { return { label: h.time, x: h.hour, y: h.total } });
            const hoursPersonMale = hours.map(h => { return { label: h.time, x: h.hour, y: h.male } });
            const hoursPersonFemale = hours.map(h => { return { label: h.time, x: h.hour, y: h.female } });
            const weekPersonTotal = week.map(h => { return { label: h.dow, x: h.dow, y: h.total } });
            const weekPersonMale = week.map(h => { return { label: h.dow, x: h.dow, y: h.male } });
            const weekPersonFemale = week.map(h => { return { label: h.dow, x: h.dow, y: h.female } });
            const heatmapPersonTotal = heatmap.map(h => { return { label: h.time, x: h.day, y: h.total } });
            const heatmapPersonRange = heatmap_range.map(h => { return { label: h.color, x: h.range, y: h.color } });
            let rangePersonAges=[]
            if(!!ageRanges){
                rangePersonAges = ageRanges.map(h => { return { label: h.range, x: h.male, y: h.female } });
            }
            dispatch(getData({
                hoursPersonTotal,
                hoursPersonMale,
                hoursPersonFemale,
                weekPersonTotal,
                weekPersonMale,
                weekPersonFemale,
                heatmapPersonTotal,
                heatmapPersonRange,
                rangePersonAges,
                maxHourPersonTotal: max_hour,
                maxHourPersonMale: max_hour_male,
                maxHourPersonFemale: max_hour_female,
                maxWeekPersonTotal: max_week_day,
                maxWeekPersonMale: max_week_day_male,
                maxWeekPersonFemale: max_week_day_female,
                monthPersonTotal,
                monthPersonMale,
                monthPersonFemale,  
                maxMonthPersonTotal: max_month_day,
                maxMonthPersonMale: max_month_day_male,
                maxMonthPersonFemale: max_month_day_female
            }))
   
        } catch (error) {
            throw new Error(error)
        
        }
    }
}

/**
 * 
 * @param {String} dateFrom fecha filtro con formato
 * @param {String} dateTo feha de inicio con formato
 * @param {String} totem variable para indicar el resource por la api
 * @param {String} groupId id del grupo de los datos
 * @returns data de la peticion
 */
const callAPIPersonForCurrentDate = async (dateFrom, dateTo, totem, groupId) => {
    
    return await (await fetchConToken(`/get-person-graphics?heatmap_p=true&age_range_p=true&date_from=${dateFrom}&date_to=${dateTo}&resource=${totem}&group_id=${groupId}`)).json();
}

/**
 * funcion para traer los datos de las horas
 * @param {String} dateFrom fecha filtro con formato
 * @param {String} dateTo feha de inicio con formato
 * @param {String} totem variable para indicar el resource por la api
 * @param {String} gender variable para indicar el genero para los datos
 * @returns callback con los datos
 */
const setGraphicsInHourForCurrentDate = (dateFrom, dateTo, totem = '', gender = 'total') => {

    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        try {
            const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
            const resp = await callAPIPersonForCurrentDate(dateFrom, dateTo, totem,groupId)
            const data = resp['hours'].map(h => { return { label: h.time, x: h.hour, y: h[gender] } });
            const capatalizeGender = gender.charAt(0).toLocaleUpperCase() + gender.substr(1, gender.length);
            const setGraphicInJson = 'hoursPerson' + capatalizeGender;
            let maxValue = resp['max_hour'];
            if (gender !== 'total') {
                maxValue = resp[`max_hour_${gender}`];
            }
            dispatch(getData({
                [setGraphicInJson]: data,
                [`maxHourPerson${capatalizeGender}`]: maxValue
            }))

            

        } catch (error) {
/*             Swal.fire('Error', 'Hubo un problema al traer su requerimiento, vuelva a intentarlo. Si el problema persiste comuniquese con uno de nuestros asesores.', 'error')
 */        }

    }



}

/**
 * funcion para traer los datos de los graficos de la semana
 * @param {String} dateFrom fecha filtro con formato
 * @param {String} dateTo feha de inicio con formato
 * @param {String} totem variable para indicar el resource por la api
 * @param {String} gender variable para indicar el genero para los datos
 * @returns callback con los datos
 */
const setGraphicsInWeekForCurrentDate = (dateFrom, dateTo, totem = '', gender = 'total') => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        try {
            const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
            const resp = await callAPIPersonForCurrentDate(dateFrom, dateTo, totem,groupId)
            const data = resp['week'].map(h => { return { label: h.dow, x: h.dow, y: h[gender] } });
            const capatalizeGender = gender.charAt(0).toLocaleUpperCase() + gender.substr(1, gender.length);
            const setGraphicInJson = 'weekPerson' + capatalizeGender;
            let maxValue = resp['max_week_day'];
            if (gender !== 'total') {
                maxValue = resp[`max_week_day_${gender}`];
            }
            dispatch(getData({
                [setGraphicInJson]: data,
                [`maxWeekPerson${capatalizeGender}`]: maxValue
            }))
        } catch (error) {
            //do some
        }
    }
}

/**
 * funcion para traer los datos de los graficos del mes
 * @param {String} dateFrom fecha filtro con formato
 * @param {String} dateTo feha de inicio con formato
 * @param {String} totem variable para indicar el resource por la api
 * @param {String} gender variable para indicar el genero para los datos
 * @returns callback con los datos
 */
const setGraphicsInMonthForCurrentDate = (dateFrom, dateTo, totem = '', gender = 'total') => {

    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        try {
            const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
            const resp = await callAPIPersonForCurrentDate(dateFrom, dateTo, totem,groupId)
            const data = resp['month'].map(h => { return { label: h.day, x: h.day, y: h[gender] } });
            const capatalizeGender = gender.charAt(0).toLocaleUpperCase() + gender.substr(1, gender.length);
            const setGraphicInJson = 'monthPerson' + capatalizeGender;
            let maxValue = resp['max_month_day'];
            if (gender !== 'total') {
                maxValue = resp[`max_month_day_${gender}`];
            }
            dispatch(getData({
                [setGraphicInJson]: data,
                [`maxMonthPerson${capatalizeGender}`]: maxValue
            }))
        } catch (error) {
            // do some     
        }
    }
}
const setGraphicsInHeatmapForCurrentDate = (dateFrom, dateTo, totem = '', gender = 'total') => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        try {
            const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
            const resp = await (await fetchConToken(`/get-person-graphics?date_from=${dateFrom}&date_to=${dateTo}&age_range_p=true&group_id=${groupId}&resource=${totem}&heatmap_p=true`)).json();
            const data = resp['heatmap'].map(h => { return { label: h.time, x: h.day, y: h.total } });
            const rangeHeatmap = resp['heatmap_range'].map(h => { return { label: h.color, x: h.range, y: h.color } });
            console.log(data)
            dispatch(getData({
                heatmapPersonTotal: data,
                heatmapPersonRange: rangeHeatmap
            }));
        } catch (error) {
            // do some    
        }
    }
}
const setGraphicsInRangeForCurrentDate =(dateFrom, dateTo, totem = '', gender = 'total') => {
    return async (dispatch,getState)=>{
        const {groups}=getState().auth;
        try {
            const groupId=groups.filter(g=>g.code===types.changeTrazabilidadByHour)[0].id;
            const resp = await (await fetchConToken(`/get-person-graphics?date_from=${dateFrom}&date_to=${dateTo}&age_range_p=true&group_id=${groupId}&totem=${totem}&heatmap_p=true`)).json();
            const data = resp['ageRanges'].map(h => { return { label: h.range, x: h.male, y: h.female } });
            dispatch(getData({
                rangePersonAges: data
            }));
        } catch (error) {
        //do some     
        }
    }
}


const getData = (data) => ({
    type: types.initializePerson,
    payload: data
})
const resetDates=()=>({
    type:types.resetDates
})

export {
    startPersonData,
    setGraphicsInHourForCurrentDate,
    setGraphicsInWeekForCurrentDate,
    setGraphicsInMonthForCurrentDate,
    setGraphicsInHeatmapForCurrentDate,
    setGraphicsInRangeForCurrentDate
}