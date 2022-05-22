import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setGraphicsInHourForCurrentDate, setGraphicsInRangeForCurrentDate, setGraphicsInWeekForCurrentDate, startPersonData } from '../../../action/person';
import { formatNumber } from '../../../helpers/calculo';
import { useDate } from '../../../hooks/useDate';
import { GraficBar } from '../../ui/grafics/GraficBar';
import { BoxDate } from '../../ui/utils/boxes/BoxDate'
import { BoxGender } from '../../ui/utils/boxes/BoxGender'
import { format } from 'date-fns'
import { downloadImageDesktop, exportPDFPerson } from '../../../helpers/exportPDF';
import { BoxWithOutPercent } from '../../ui/utils/boxes/BoxWithOutPercent';
import { BoxWithPercent } from '../../ui/utils/boxes/BoxWithPercent';
import { GraficCompare } from '../../ui/grafics/GraficCompare';
export const MobileScreen = () => {
    const dispatch = useDispatch();
    const { hoursPersonTotal, hoursPersonMale, hoursPersonFemale, weekPersonTotal, weekPersonMale,
        weekPersonFemale,
        rangePersonAges,
        maxHourPerson,
        maxHourPersonMale,
        maxHourPersonFemale,
        maxWeekPerson,
        maxWeekPersonMale,
        maxWeekPersonFemale} = useSelector(state => state.person);

        
    /*  */
    const [DateHour,startDateHour,endDateHour, setStartDateHrTotal, setEndDateHrTotal] = useDate(setGraphicsInHourForCurrentDate, '', 'total', 'dateStartHourPerson', 'dateEndHourPerson', '');
    const [DateHourMale,startDateHourMale ,endDateHourMale , setStartDateHrMale, setEndDateHrMale] = useDate(setGraphicsInHourForCurrentDate, '', 'male', 'dateStartHourMalePerson', 'dateEndHourMalePerson', '');
    const [DateHourFemale,startDateHourFemale , endDateHourFemale, setStartDateHrFemale, setEndDateHrFemale] = useDate(setGraphicsInHourForCurrentDate, '', 'female', 'dateStartHourFemalePerson', 'dateEndHourFemalePerson', '');
    const [DateWeek, dateStartWeekPerson,dateEndWeekPerson , setStartDateWkTotal, setEndDateWkTotal] = useDate(setGraphicsInWeekForCurrentDate, '', 'total', 'dateStartWeekPerson', 'dateEndWeekPerson', '');
    const [DateWeekMale,dateStartWeekMalePerson ,dateEndWeekMalePerson , setStartDateWkMale, setEndDateWkMale] = useDate(setGraphicsInWeekForCurrentDate, '', 'male', 'dateStartWeekMalePerson', 'dateEndWeekMalePerson', '');
    const [DateWeekFemale,dateStartWeekFemalePerson ,dateEndWeekFemalePerson , setStartDateWkFemale, setEndDateWkFemale] = useDate(setGraphicsInWeekForCurrentDate, '', 'female', 'dateStartWeekFemalePerson', 'dateEndWeekFemalePerson', '');
    const [DateAgeRanges,dateStartAgePerson ,dateEndAgePerson , setStartDateAgeRg, setEndDateAgeRg] = useDate(setGraphicsInRangeForCurrentDate, '', 'total', 'dateStartAgePerson', 'dateEndAgePerson', '');
    useEffect(() => {
        (() => {
            dispatch(startPersonData())
        })()
    }, [dispatch])
    const refresh=()=>{
        window.location.reload();
    }

    return (
        <div id="mobileversion">
            <header>
                <div className="headerTop d-flex auth">
                    <img className="imgSmall" src="/assets/images/header/onlysoda.png" alt="logosoda" />
                    <h1 className="titleHeadAuth">
                        data <br />
                    street <br />
                    performance
                </h1>
                </div>
                <div className="w-100 text-center logoMiddle">
                    <img src="./assets/images/header/soda.png" alt="logosoda" />
                </div>
            </header>
            <div className="codecontent">
                <span className="code">CO.UNIC.001</span>
            </div>

            <div className="actionButtons">
                <div className="grid-2">
                    <button className="active"><img src="./assets/icons/mobile/person-mobile.svg" alt="person" /><span>Personas</span></button>
                </div>
                <div className="grid-2">
                    <button><img src="./assets/icons/mobile/calendar-mobile.png" alt="calendar" /><span>Tiempo Real</span></button>
                    <button onClick={refresh}><img src="./assets/icons/mobile/calendar-mobile.png"  alt="calendar" /><span>Actualizar</span></button>

                </div>
            </div>
            <div className="codecontent">
                <span className="code">PERSONAS</span>
            </div>

            <div className="spaceXY fitmobile border-bottom">
                <BoxDate count={45} percent={0} />
                <div className="grid-2 spaceTopSmall">
                    <BoxGender count={4} total={100} />
                    <BoxGender count={4} total={100} />
                </div>
            </div>

            <div className="spaceXY fitmobile border-bottom">
                <h3 className="subTitle  text-center">TOTAL DE PERSONAS POR HORA DEL DÍA</h3>

                <div className="detailGrafic spaceXY ">
                    <span className="detailMax">Hora más transitada: {maxHourPerson?.hour} con {formatNumber(maxHourPerson?.total)} personas</span>
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
                    id="grafichourTotal" />
                <div className="btnExportsGraphics">

                    <button onClick={() => downloadImageDesktop('grafichourTotal', format(startDateHour, 'yyyy-MM-dd'), format(endDateHour, 'yyyy-MM-dd'), 'hour', 'P')}><img src="./assets/icons/share.svg" /></button>
                </div>
            </div>
            <div className="spaceXY fitmobile border-bottom">
                <h3 className="subTitle  text-center">TOTAL DE HOMBRES POR HORA DEL DÍA</h3>

                <div className="detailGrafic spaceXY ">
                    <span className="detailMax">Hora más transitada: {maxHourPersonMale?.hour} con {formatNumber(maxHourPersonMale?.total)} personas</span>
                    {hoursPersonMale.length > 0 && <DateHourMale />}
                </div>
                <GraficBar data={hoursPersonMale} label="Total de Personas" dtsetbg="#0502D3"
                    optionbg="#454545"
                    legendbg="#454545"
                    title=" Hora:"
                    labelop=" Total de Hombres:"
                    scltxtlbl="Cantidad de Hombres"
                    scalebg="#0502D3"
                    theme="bg-yellow"
                    id="grafichourMale" />
                <div className="btnExportsGraphics">

                    <button onClick={() => downloadImageDesktop('grafichourMale', format(startDateHourMale, 'yyyy-MM-dd'), format(endDateHourMale, 'yyyy-MM-dd'), 'hour', 'P')}><img src="./assets/icons/share.svg" /></button>
                </div>
            </div>


            <div className="spaceXY fitmobile border-bottom">
                <h3 className="subTitle  text-center">TOTAL DE MUJERES POR HORA DEL DÍA</h3>

                <div className="detailGrafic spaceXY">
                    <span className="detailMax">Hora más transitada: {maxHourPersonFemale?.hour} con {formatNumber(maxHourPersonFemale?.total)} personas</span>
                    {hoursPersonFemale.length > 0 && <DateHourFemale />}
                </div>
                <GraficBar data={hoursPersonFemale} label="Total de Mujeres" dtsetbg="#0502D3"
                    optionbg="#454545"
                    legendbg="#454545"
                    title=" Hora:"
                    labelop=" Total de Mujeres:"
                    scltxtlbl="Cantidad de Mujeres"
                    scalebg="#0502D3"
                    id="grafichourfemale"
                />
                <div className="btnExportsGraphics">
                    {hoursPersonFemale.length > 0 && <button onClick={() => downloadImageDesktop('grafichourfemale', startDateHourFemale, endDateHourFemale, 'hour', 'P')}
                    ><img src="./assets/icons/share.svg" /></button>
                    }

                </div>
            </div>

            <div className="spaceXY fitmobile border-bottom">
                <BoxWithOutPercent count={45} percent={0} />
                <div className="grid-2 spaceTopSmall">
                    <BoxGender count={4} total={100} />
                    <BoxGender count={4} total={100} />
                </div>
            </div>
            <div className="spaceXY fitmobile">
                <BoxWithPercent count={45} percent={0} />
                <div className="grid-2 spaceTopSmall">
                    <BoxGender count={4} total={100} />
                    <BoxGender count={4} total={100} />
                </div>
            </div>

            <div className="spaceXY fitmobile border-bottom">
                <h3 className="subTitle  text-center">TOTAL DE PERSONAS POR DÍA DE LA SEMANA</h3>
                <div className="detailGrafic spaceXY">
                    <span className="detailMax">Día de la semana más transitado: {maxWeekPerson?.day} con {formatNumber(maxWeekPerson?.total)} personas</span>
                    {weekPersonTotal.length > 0 && <DateWeek />}
                </div>
                <GraficBar data={weekPersonTotal} label="Tiempo (Días)"
                    dtsetbg="#0a18f1"
                    optionbg="#454545"
                    scalebg="#0502D3"
                    title="Día"
                    labelop="tránsito de personas"
                    scltxtlbl="Cantidad de Personas"
                    id="graficweek"
                />
                <div className="btnExportsGraphics">
                    {weekPersonTotal.length > 0 && <button onClick={() => downloadImageDesktop('graficweek', dateStartWeekPerson, dateEndWeekPerson, 'week', 'P')}
                    ><img src="./assets/icons/share.svg" /></button>}

                </div>
            </div>


            <div className="spaceXY fitmobile border-bottom">
                <h3 className="subTitle  text-center">TOTAL DE HOMBRES POR DÍA DE LA SEMANA</h3>
                <div className="detailGrafic spaceXY">
                    <span className="detailMax">Día de la semana más transitado: {maxWeekPersonMale?.day} con {formatNumber(maxWeekPersonMale?.total)} personas</span>
                    {weekPersonMale.length > 0 && <DateWeekMale />}

                </div>
                <GraficBar data={weekPersonMale} label="Tiempo (Días)"
                    dtsetbg="#0a18f1"
                    optionbg="#454545"
                    scalebg="#0502D3"
                    title="Día"
                    labelop="tránsito de Hombres"
                    scltxtlbl="Cantidad de Hombres"
                    id="graficweekmale"
                />
                <div className="btnExportsGraphics">
                    {weekPersonMale.length > 0 && <button onClick={() => downloadImageDesktop('graficweekmale', dateStartWeekMalePerson, dateEndWeekMalePerson, 'week', 'P')}
                    ><img src="./assets/icons/share.svg" /></button>}

                </div>
            </div>


            <div className="spaceXY fitmobile border-bottom">
                <h3 className="subTitle  text-center">TOTAL DE MUJERES POR DÍA DE LA SEMANA</h3>
                <div className="detailGrafic spaceXY">
                    <span className="detailMax">Día de la semana más transitado: {maxWeekPersonFemale?.day} con {formatNumber(maxWeekPersonFemale?.total)} personas</span>
                    {weekPersonFemale.length > 0 && <DateWeekFemale />}

                </div>
                <GraficBar data={weekPersonFemale} label="Tiempo (Días)"
                    dtsetbg="#0a18f1"
                    optionbg="#454545"
                    scalebg="#0502D3"
                    title="Día"
                    labelop="tránsito de Mujeres"
                    scltxtlbl="Cantidad de Mujeres"
                    id="graficweekfemale"
                />
                <div className="btnExportsGraphics">
                    {weekPersonFemale.length > 0 && <button onClick={() => downloadImageDesktop('graficweekfemale', dateStartWeekFemalePerson, dateEndWeekFemalePerson, 'week', 'P')}
                    ><img src="./assets/icons/share.svg" /></button>}

                </div>
            </div>

            <div className="spaceXY fitmobile border-bottom" >
                <BoxDate count={45} percent={0} />
                <div className="grid-2 spaceTopSmall">
                    <BoxGender count={4} total={100} />
                    <BoxGender count={4} total={100} />
                </div>
            </div>


            <div className="spaceXY fitmobile">
                <h3 className="subTitle  text-center">TOTAL ACUMULADO - GÉNERO</h3>

                <div className="detailGrafic spaceXY">
                    <span className="detailMax"></span>
                    {rangePersonAges.length > 0 && <DateAgeRanges />}
                </div>
                <div className="btnExportsGraphics">
                    <GraficCompare data={rangePersonAges} id="graficAgeRange" />
                    {rangePersonAges.length > 0 && <button onClick={() => downloadImageDesktop('graficAgeRange', dateStartAgePerson, dateEndAgePerson, 'age', 'P')}
                    ><img src="./assets/icons/share.svg" /></button>}

                </div>
            </div>



        </div>
    )
}
