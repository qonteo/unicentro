import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setGraphicsInHourForCurrentDate, setGraphicsInMonthForCurrentDate, setGraphicsInWeekForCurrentDate, startPersonData } from '../../../../action/person';
import { getTrazabilidad } from '../../../../action/trazabilidad';
import { formatNumber } from '../../../../helpers/calculo';
import { downloadImageDesktop, exportExcel, exportPDFPerson } from '../../../../helpers/exportPDF';
import { useButtons } from '../../../../hooks/useButtons';
import { useDate } from '../../../../hooks/useDate';
import { ButtonsExport } from '../../../ui/exports/ButtonsExport';
import { GraficBar } from '../../../ui/grafics/GraficBar';
import { GraficLine } from '../../../ui/grafics/GraficLine';
import { Main } from '../../../ui/layout/Main'
const validsSensors = ['ccpn001', 'ccpn002', 'ccpn003'];
export const SensorScreen = ({ history }) => {
    const { resources } = useSelector(state => state.trazabilidad);
    const person = useSelector(state => state.person);
    const { hoursPersonTotal, hoursPersonMale, hoursPersonFemale, weekPersonTotal, weekPersonMale,
        weekPersonFemale, monthPersonTotal,
        monthPersonMale, monthPersonFemale,
        heatmapPersonTotal, heatmapPersonRange,
        rangePersonAges,
        maxHourPersonTotal,
        maxHourPersonMale,
        maxHourPersonFemale,
        maxWeekPersonTotal,
        maxWeekPersonMale,
        maxWeekPersonFemale,
        maxMonthPersonTotal,
        maxMonthPersonMale,
        maxMonthPersonFemale } = useSelector(state => state.person);
    const { dateStartHourPerson, dateEndHourPerson,
        dateStartHourMalePerson, dateEndHourMalePerson,
        dateStartHourFemalePerson, dateEndHourFemalePerson,
        dateStartWeekPerson, dateEndWeekPerson,
        dateStartWeekMalePerson, dateEndWeekMalePerson,
        dateStartWeekFemalePerson, dateEndWeekFemalePerson,
        dateStartMonthPerson, dateEndMonthPerson,
        dateStartMonthMalePerson, dateEndMonthMalePerson,
        dateStartMonthFemalePerson, dateEndMonthFemalePerson,
        dateStartAgePerson, dateEndAgePerson,
        dateStartHeatMap, dateEndHeatMap } = useSelector(state => state.date);
    const { name } = useParams();
    const dispatch = useDispatch();
    const [DateHour] = useDate(setGraphicsInHourForCurrentDate, name, 'total', 'dateStartHourPerson', 'dateEndHourPerson', '');
    const [DateWeek] = useDate(setGraphicsInWeekForCurrentDate, name,'total', 'dateStartWeekPerson', 'dateEndWeekPerson','');
    const [DateMonth] = useDate(setGraphicsInMonthForCurrentDate,name,'total', 'dateStartMontPerson', 'dateEndMonthPerson','',true);
    const [ButtonHourTotal, hourstotalrst] = useButtons({
        0: 'HOY',
        7: '07 DÍAS',
        15: '15 DÍAS',
        30: '30 DÍAS'
    }, setGraphicsInHourForCurrentDate, name, 'total', 'dateStartHourPerson', 'dateEndHourMalePerson', 'hourstotalrst', 1);
    const [ButtonWeekTotal, weektotalrst] = useButtons({
        7: 'ULTIMA SEMANA',
        30: '30 DÍAS',
    },setGraphicsInWeekForCurrentDate, name,'total', 'dateStartWeekPerson', 'dateEndWeekPerson','weektotalrst')
    const [ButtonMonthTotal, monthtotalrst] = useButtons({
        30: 'ÚLTIMO MES',
        60: 'ÚLTIMO DOS MES',
        90: 'ÚLTIMO TRES MES',
    },setGraphicsInMonthForCurrentDate,name,'total', 'dateStartMontPerson', 'dateEndMonthPerson','monthtotalrst')
    
    useEffect(() => {
        (() => {
            if (!validsSensors.includes(name.toLowerCase())) {
                history.push('/')
            }
            dispatch(getTrazabilidad());
            dispatch(startPersonData())
        })()
    }, [])
    return (
        <Main>
            <h3 className="subTitle spaceTop">Tienda 1:Panistería</h3>
            <div className="spaceTop">
                <div className="contentcanvas   m-auto">
                    <canvas style={{ backgroundImage: `url(/assets/images/planoflujo.jpg)` }} className="mt" id="monitoreoSensor" width="1024" height="556"></canvas>
                </div>
            </div>


            <div className="spaceXY d-block">
                <h3 className="subTitle  text-center">TOTAL DE PERSONAS POR HORA DEL DÍA</h3>
                <span className="spaceBottom text-center d-block">( {dateStartHourPerson} - {dateEndHourPerson} )</span>
                {hoursPersonTotal.length > 0 && <ButtonHourTotal />}
                <div className="detailGrafic spaceBottom">
                    <span className="detailMax">Hora más transitada: {maxHourPersonTotal?.hour} con {formatNumber(maxHourPersonTotal?.total)} personas</span>
                    {hoursPersonTotal.length > 0 && <DateHour />}
                </div>
                <GraficBar data={hoursPersonTotal} label="Total de Personas" dtsetbg="#0502D3"
                    optionbg="#454545"
                    legendbg="#454545"
                    title=" Hora:"
                    labelop=" Total de Personas:"
                    scltxtlbl="Cantidad de Personas"
                    scalebg="#0502D3"
                    theme="bg-yellow"
                    id="grafichourTotal"
                />
                {hoursPersonTotal.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('grafichourTotal', dateStartHourPerson, dateEndHourPerson, 'TOTAL DE HOMBRES POR HORA DEL DÍA', `HORA MÁS TRANSITADA: ${maxHourPersonTotal.hour} CON ${formatNumber(maxHourPersonTotal.total)} PERSONAS`, false, name)}
                    methodcsv={() => exportExcel('hour', dateStartHourPerson, dateEndHourPerson, 'DE-HOMBRES-POR-HORA-DEL-DIA')}
                    methodshare={() => downloadImageDesktop('grafichourTotal', dateStartHourPerson, dateEndHourPerson, 'hour', 'P')}
                />}
            </div>
            <div className="spaceXY d-block">
                    <h3 className="subTitle  text-center">TOTAL DE PERSONAS POR DÍA DE LA SEMANA</h3>
                    <span className="spaceBottom range-date text-center d-block">( {dateStartWeekPerson} - {dateEndWeekPerson} )</span>
                    {weekPersonTotal.length > 0 && <ButtonWeekTotal />}
                    <div className="detailGrafic spaceBottom">
                        <span className="detailMax">Día de la semana más transitado: {maxWeekPersonTotal?.day} con {formatNumber(maxWeekPersonTotal?.total)} personas</span>
                        {weekPersonTotal.length > 0 && <DateWeek />}
                    </div>
                    <GraficLine data={weekPersonTotal} label="Tiempo (Días)"
                        dtsetbg="#0a18f1"
                        optionbg="#454545"
                        scalebg="#0502D3"
                        title="Día"
                        labelop="tránsito de personas"
                        scltxtlbl="Cantidad de Personas"
                        id="graficweek"
                    />

                    {weekPersonTotal.length>0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficweek', dateStartWeekPerson, dateEndWeekPerson, 'TOTAL DE PERSONAS POR DÍA DE LA SEMANA', `DIA MÁS TRANSITADO: ${maxWeekPersonTotal.day} CON ${formatNumber(maxWeekPersonTotal.total)} PERSONAS`, false, name)}
                        methodcsv={() => exportExcel('week', dateStartWeekPerson, dateEndWeekPerson, 'DE-PERSONAS-POR-DIA-DE-LA-SEMANA')}
                        methodshare={() => downloadImageDesktop('graficweek', dateStartWeekPerson, dateEndWeekPerson, 'week', 'P')}
                    />}
                </div>

                <div className="spaceXY d-block">
                    <h3 className="subTitle  text-center">ACUMULADO DE PERSONAS POR CADA DÍA DEL MES</h3>
                    <span className="spaceBottom range-date text-center d-block">( {dateStartMonthPerson} - {dateEndMonthPerson} )</span>
                    {monthPersonTotal.length > 0 && <ButtonMonthTotal />}
                    <div className="detailGrafic spaceBottom">
                        <span className="detailMax">Día del mes más transitado: {maxMonthPersonTotal?.day} con {maxMonthPersonTotal?.total} personas</span>
                        {monthPersonTotal.length > 0 && <DateMonth />}

                    </div>
                    <GraficBar
                        data={monthPersonTotal}
                        label="Tiempo (Días)"
                        dtsetbg="#0a18f1"
                        optionbg="#454545"
                        scalebg="#0502D3"
                        title="Día: "
                        labelop="tránsito de Personas"
                        scltxtlbl="Cantidad de Personas"
                        theme="bg-yellow"
                        id="graficmonth"
                    />
                    {monthPersonTotal.length>0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficmonth', dateStartMonthPerson, dateEndMonthPerson, 'TOTAL DE PERSONAS POR DÍA DEL MES', `DIA MÁS TRANSITADA: ${maxMonthPersonTotal.day} CON ${formatNumber(maxMonthPersonTotal.total)} PERSONAS`, false, name)}
                        methodcsv={() => exportExcel('month', dateStartMonthPerson, dateEndMonthPerson, 'DE-PERSONAS-POR-DIA-DEL-MES')}
                        methodshare={() => downloadImageDesktop('graficmonth', dateStartMonthPerson, dateEndMonthPerson, 'month', 'P')}
                    />}
                </div>


        </Main>
    )
}
