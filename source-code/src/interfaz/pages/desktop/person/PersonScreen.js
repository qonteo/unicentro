import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGraphicsInHeatmapForCurrentDate, setGraphicsInHourForCurrentDate, setGraphicsInMonthForCurrentDate, setGraphicsInRangeForCurrentDate, setGraphicsInWeekForCurrentDate, startPersonData } from '../../../../action/person'
import { GraficBar } from '../../../ui/grafics/GraficBar';
import { Main } from '../../../ui/layout/Main';
import { BoxDate } from '../../../ui/utils/boxes/BoxDate';
import { BoxDateRange } from '../../../ui/utils/boxes/BoxDateRange';
import { BoxGender } from '../../../ui/utils/boxes/BoxGender';
import { BoxWithOutPercent } from '../../../ui/utils/boxes/BoxWithOutPercent';
import { BoxWithPercent } from '../../../ui/utils/boxes/BoxWithPercent';
import '../../../../helpers/roundbarchart';
import { useDate } from '../../../../hooks/useDate';
import { GraficLine } from '../../../ui/grafics/GraficLine';
import { HeatMapDesktop } from '../../../ui/grafics/HeatMapDesktop';
import { GraficCompare } from '../../../ui/grafics/GraficCompare';
import { useButtons } from '../../../../hooks/useButtons';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { startToten } from '../../../../action/toten';
import { exportExcel, exportPDFPerson, downloadImageDesktop } from '../../../../helpers/exportPDF';
import { formatNumber } from '../../../../helpers/calculo';
import { ButtonsExport } from '../../../ui/exports/ButtonsExport';
import { types } from '../../../../types/types';

export const PersonScreen = ({ location }) => {
    const dispatch = useDispatch();
    /*   console.log('SE RENDERIZO') */
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

    const { totemTotal, resources, tabs } = useSelector(state => state.toten);
    const [toten, setToten] = useState('');


    const [DateHour, , , setStartDateHrTotal, setEndDateHrTotal] = useDate(setGraphicsInHourForCurrentDate, toten, 'total', 'dateStartHourPerson', 'dateEndHourPerson', '');
    const [DateHourMale, , , setStartDateHrMale, setEndDateHrMale] = useDate(setGraphicsInHourForCurrentDate, toten, 'male', 'dateStartHourMalePerson', 'dateEndHourMalePerson', '');
    const [DateHourFemale, , , setStartDateHrFemale, setEndDateHrFemale] = useDate(setGraphicsInHourForCurrentDate, toten, 'female', 'dateStartHourFemalePerson', 'dateEndHourFemalePerson', '');
    const [DateWeek, , , setStartDateWkTotal, setEndDateWkTotal] = useDate(setGraphicsInWeekForCurrentDate, toten, 'total', 'dateStartWeekPerson', 'dateEndWeekPerson', '');
    const [DateWeekMale, , , setStartDateWkMale, setEndDateWkMale] = useDate(setGraphicsInWeekForCurrentDate, toten, 'male', 'dateStartWeekMalePerson', 'dateEndWeekMalePerson', '');
    const [DateWeekFemale, , , setStartDateWkFemale, setEndDateWkFemale] = useDate(setGraphicsInWeekForCurrentDate, toten, 'female', 'dateStartWeekFemalePerson', 'dateEndWeekFemalePerson', '');
    const [DateMonth, , , setStartDateMntTotal, setEndDateMntTotal] = useDate(setGraphicsInMonthForCurrentDate, toten, 'total', 'dateStartMonthPerson', 'dateEndMonthPerson', '', true);
    const [DateMonthMale, , , setStartDateMntMale, setEndDateMntMale] = useDate(setGraphicsInMonthForCurrentDate, toten, 'male', 'dateStartMonthMalePerson', 'dateEndMonthMalePerson', '', true);
    const [DateMonthFemale, , , setStartDateMntFemale, setEndDateMntFemale] = useDate(setGraphicsInMonthForCurrentDate, toten, 'female', 'dateStartMonthFemalePerson', 'dateEndMonthFemalePerson', '', true);
    const [DateAgeRanges, , , setStartDateAgeRg, setEndDateAgeRg] = useDate(setGraphicsInRangeForCurrentDate, toten, 'total', 'dateStartAgePerson', 'dateEndAgePerson', '');
    const [ButtonHourTotal, hourstotalrst] = useButtons({
        0: 'HOY',
        7: '07 DÍAS',
        15: '15 DÍAS',
        30: '30 DÍAS'
    }, setGraphicsInHourForCurrentDate, toten, 'total', 'dateStartHourPerson', 'dateEndHourPerson', 'hourstotalrst', 1, setStartDateHrTotal, setEndDateHrTotal);
    const [ButtonHourMale, hoursmalerst] = useButtons({
        0: 'HOY',
        7: '07 DÍAS',
        15: '15 DÍAS',
        30: '30 DÍAS'
    }, setGraphicsInHourForCurrentDate, toten, 'male', 'dateStartHourMalePerson', 'dateEndHourMalePerson', 'hoursmalerst', 1, setStartDateHrMale, setEndDateHrMale)
    const [ButtonHourFemale, hoursfemalerst] = useButtons({
        0: 'HOY',
        7: '07 DÍAS',
        15: '15 DÍAS',
        30: '30 DÍAS'
    }, setGraphicsInHourForCurrentDate, toten, 'female', 'dateStartHourFemalePerson', 'dateEndHourFemalePerson', 'hoursfemalerst', 1, setStartDateHrFemale, setEndDateHrFemale)
    const [ButtonWeekTotal, weektotalrst] = useButtons({
        7: 'ULTIMA SEMANA',
        30: '30 DÍAS',
    }, setGraphicsInWeekForCurrentDate, toten, 'total', 'dateStartWeekPerson', 'dateEndWeekPerson', 'weektotalrst', 0, setStartDateWkTotal, setEndDateWkTotal)
    const [ButtonWeekMale, weekmalerst] = useButtons({
        7: 'ULTIMA SEMANA',
        30: '30 DÍAS',
    }, setGraphicsInWeekForCurrentDate, toten, 'male', 'dateStartWeekMalePerson', 'dateEndWeekMalePerson', 'weekmalerst', 0, setStartDateWkMale, setEndDateWkMale)
    const [ButtonWeekFemale, weekfemalerst] = useButtons({
        7: 'ULTIMA SEMANA',
        30: '30 DÍAS',
    }, setGraphicsInWeekForCurrentDate, toten, 'female', 'dateStartWeekFemalePerson', 'dateEndWeekFemalePerson', 'weekfemalerst', 0, setStartDateWkFemale, setEndDateWkFemale)
    const [ButtonMonthTotal, monthtotalrst] = useButtons({
        30: 'ÚLTIMO MES',
        60: 'ÚLTIMO DOS MES',
        90: 'ÚLTIMO TRES MES',
    }, setGraphicsInMonthForCurrentDate, toten, 'total', 'dateStartMonthPerson', 'dateEndMonthPerson', 'monthtotalrst', 0, setStartDateMntTotal, setEndDateMntTotal)
    const [ButtonMonthMale, monthmalerst] = useButtons({
        30: 'ÚLTIMO MES',
        60: 'ÚLTIMO DOS MES',
        90: 'ÚLTIMO TRES MES',
    }, setGraphicsInMonthForCurrentDate, toten, 'male', 'dateStartMonthMalePerson', 'dateEndMonthMalePerson', 'monthmalerst', 0, setStartDateMntMale, setEndDateMntMale)
    const [ButtonMonthFemale, monthfemalerst] = useButtons({
        30: 'ÚLTIMO MES',
        60: 'ÚLTIMO DOS MES',
        90: 'ÚLTIMO TRES MES',
    }, setGraphicsInMonthForCurrentDate, toten, 'female', 'dateStartMonthFemalePerson', 'dateEndMonthFemalePerson', 'monthfemalerst', 0, setStartDateMntFemale, setEndDateMntFemale)
    const [ButtonHeatMap, heatmaprst] = useButtons({
        0: 'HOY',
        7: '07 DÍAS',
        15: '15 DÍAS',
        30: '30 DÍAS'
    }, setGraphicsInHeatmapForCurrentDate, toten, 'total', 'dateStartHeatMap', 'dateEndHeatMap', 'heatmaprst', 1)
    const [ButtonRangeAges, ageRangesrst] = useButtons({
        0: 'HOY',
        60: 'ACUMULADO',
        7: '07 DÍAS',
        15: '15 DÍAS',
        30: '30 DÍAS'
    }, setGraphicsInRangeForCurrentDate, toten, 'total', 'dateStartAgePerson', 'dateEndAgePerson', 'ageRangesrst', 1, setStartDateAgeRg, setEndDateAgeRg)



    useEffect(() => {
        (() => {
            dispatch(startPersonData(toten))
            dispatch(startToten());
        })()
    }, [])

    const changeTab = async ({ target }) => {
        if (target.classList.contains('totenactivetab')) {
            return false;
        }
        if (target.tagName == 'LI') {
            const numToten = target.getAttribute("tab-index");
            setToten(numToten)
            dispatch(startPersonData(numToten))
        }
    }

    return (
        <Main >
            <div className="contenedor">
                <span className="spaceXY codeQonteo">{types.GroupName}</span>
                {/*    <TitleHead>Personas</TitleHead> */}
                <h3 className="subTitle">OPORTUNIDADES/PERSONAS</h3>
                <Tabs selectedTabClassName="totenactivetab" className="spaceXY">
                    <TabList onClick={changeTab}>
                        <Tab tab-index="">TOTAL ACUMULADO</Tab>
                        {tabs.map((t, _i) => (
                            <Tab key={_i} tab-index={t.code.toString()}>{t.name}</Tab>
                        ))}
                    </TabList>
                    <TabPanel>
                        <div className="">

                            <div className="boxGridFour">
                                <BoxDate count={totemTotal?.today?.count} percent={totemTotal?.today?.percent} />
                                <BoxWithOutPercent theme="light" count={totemTotal?.yesterday?.total} />
                                <BoxWithPercent theme="light" count={totemTotal?.week?.total} percent={totemTotal?.week?.percent} />
                                <BoxDateRange theme="light" count={totemTotal?.total?.count} />
                            </div>
                         
                            <div className="boxGridFour spaceTop">
                                <BoxGender gender="female" count={totemTotal?.today?.female} total={totemTotal?.today?.count} txtDay="HOY" />
                                <BoxGender gender="female" count={totemTotal?.yesterday?.female} total={totemTotal?.yesterday?.total} txtDay="AYER" theme="light" />
                                <BoxGender gender="female" count={totemTotal?.week?.female} total={totemTotal?.week?.total} txtDay="ESTA SEMANA" theme="light" />
                                <BoxGender gender="female" count={totemTotal?.total?.female} total={totemTotal?.total?.count} txtDay="TOTAL" theme="light" />
                            </div>
                            <div className="boxGridFour spaceTop">
                                <BoxGender gender="male" count={totemTotal?.today?.male} total={totemTotal?.today?.count} txtDay="HOY" />
                                <BoxGender gender="male" count={totemTotal?.yesterday?.male} total={totemTotal?.yesterday?.total} txtDay="AYER" theme="light" />
                                <BoxGender gender="male" count={totemTotal?.week?.male} total={totemTotal?.week?.total} txtDay="ESTA SEMANA" theme="light" />
                                <BoxGender gender="male" count={totemTotal?.total?.male} total={totemTotal?.total?.count} txtDay="TOTAL" theme="light" />
                            </div>

                        </div>

                    </TabPanel>
                
                    {resources.map((r,_i) => (
                        
                        <TabPanel key={_i}>
                                
                            <div className="">

                                <div className="boxGridFour">
                                    <BoxDate count={r?.today?.count} percent={r?.today?.percent} />
                                    <BoxWithOutPercent theme="light" count={r?.yesterday?.total} />
                                    <BoxWithPercent theme="light" count={r?.week?.total} percent={r?.week?.percent} />
                                    <BoxDateRange theme="light" count={r?.total?.count} />
                                </div>

                                {
                                    (r?.total?.female) &&
                                    <div className="boxGridFour spaceTop">
                                        <BoxGender gender="female" count={r?.today?.female} total={r?.today?.count} txtDay="HOY" />
                                        <BoxGender gender="female" count={r?.yesterday?.female} total={r?.yesterday?.total} txtDay="AYER" theme="light" />
                                        <BoxGender gender="female" count={r?.week?.female} total={r?.week?.total} txtDay="ESTA SEMANA" theme="light" />
                                        <BoxGender gender="female" count={r?.total?.female} total={r?.total?.count} txtDay="TOTAL" theme="light" />
                                    </div>
                                }

                                {
                                    (r?.total?.male) &&
                                    <div className="boxGridFour spaceTop">
                                        <BoxGender gender="male" count={r?.today?.male} total={r?.today?.count} txtDay="HOY" />
                                        <BoxGender gender="male" count={r?.yesterday?.male} total={r?.yesterday?.total} txtDay="AYER" theme="light" />
                                        <BoxGender gender="male" count={r?.week?.male} total={r?.week?.total} txtDay="ESTA SEMANA" theme="light" />
                                        <BoxGender gender="male" count={r?.total?.male} total={r?.total?.count} txtDay="TOTAL" theme="light" />
                                    </div>
                                }

                            </div>

                        </TabPanel>

                    ))}

                </Tabs>

                <div className="spaceXY d-block">



                    {hoursPersonTotal.length > 0 && <>
                        <h3 className="subTitle  text-center">TOTAL DE PERSONAS POR HORA DEL DÍA</h3>
                        <span className="spaceBottom text-center d-block">( {dateStartHourPerson} - {dateEndHourPerson} )</span>
                        <ButtonHourTotal />
                        <div className="detailGrafic spaceBottom">
                            <span className="detailMax">Hora más transitada: {maxHourPersonTotal?.hour} con {formatNumber(maxHourPersonTotal?.total)} personas</span>
                            <DateHour />
                        </div>
                    </>}


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
                    {hoursPersonTotal.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('grafichourTotal', dateStartHourPerson, dateEndHourPerson, 'TOTAL DE HOMBRES POR HORA DEL DÍA', `HORA MÁS TRANSITADA: ${maxHourPersonTotal.hour} CON ${formatNumber(maxHourPersonTotal.total)} PERSONAS`, false, toten)}
                        methodcsv={() => exportExcel('hour', dateStartHourPerson, dateEndHourPerson, 'DE-HOMBRES-POR-HORA-DEL-DIA')}
                        methodshare={() => downloadImageDesktop('grafichourTotal', dateStartHourPerson, dateEndHourPerson, 'hour', 'P')}
                    />}
                </div>
                {toten !== 'CCPN003' &&
                    <div className="spaceXY d-block">
                        <h3 className="subTitle  text-center">TOTAL DE HOMBRES POR HORA DEL DÍA</h3>
                        <span className="spaceBottom range-date text-center d-block">( {dateStartHourMalePerson} - {dateEndHourMalePerson} )</span>
                        {hoursPersonMale.length > 0 && <ButtonHourMale />}

                        <div className="detailGrafic spaceBottom">
                            <span className="detailMax">Hora más transitada: {maxHourPersonMale?.hour} con {formatNumber(maxHourPersonMale?.total)} personas</span>
                            {hoursPersonMale.length > 0 && <DateHourMale />}
                        </div>
                        <GraficBar data={hoursPersonMale} label="Total de Hombres" dtsetbg="#0502D3"
                            optionbg="#454545"
                            legendbg="#454545"
                            title=" Hora:"
                            labelop=" Total de Hombres:"
                            scltxtlbl="Cantidad de Hombres"
                            scalebg="#0502D3" id="grafichourMale"
                            id="grafichourMale"
                        />

                        {hoursPersonMale.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('grafichourMale', dateStartHourMalePerson, dateEndHourMalePerson, 'TOTAL DE HOMBRES POR HORA DEL DÍA', `HORA MÁS TRANSITADA: ${maxHourPersonMale.hour} CON ${formatNumber(maxHourPersonMale.total)} PERSONAS`, false, toten)}
                            methodcsv={() => exportExcel('hour', dateStartHourMalePerson, dateEndHourMalePerson, 'DE-HOMBRES-POR-HORA-DEL-DIA')}
                            methodshare={() => downloadImageDesktop('grafichourMale', dateStartHourMalePerson, dateEndHourMalePerson, 'hour', 'P')}
                        />}
                    </div>
                }

                {toten !== 'CCPN003' &&
                    <div className="spaceXY d-block">
                        {hoursPersonFemale.length > 0 && <>
                            <h3 className="subTitle  text-center">TOTAL DE MUJERES POR HORA DEL DÍA</h3>
                            <span className="spaceBottom range-date text-center d-block">( {dateStartHourFemalePerson} - {dateEndHourFemalePerson} )</span>
                            <ButtonHourFemale />
                            <div className="detailGrafic spaceBottom">
                                <span className="detailMax">Hora más transitada: {maxHourPersonFemale?.hour} con {formatNumber(maxHourPersonFemale?.total)} personas</span>
                                <DateHourFemale />
                            </div>
                        </>}
                        <GraficBar data={hoursPersonFemale} label="Total de Mujeres" dtsetbg="#0502D3"
                            optionbg="#454545"
                            legendbg="#454545"
                            title=" Hora:"
                            labelop=" Total de Mujeres:"
                            scltxtlbl="Cantidad de Mujeres"
                            scalebg="#0502D3"
                            id="grafichourfemale"
                        />
                        {hoursPersonFemale.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('grafichourfemale', dateStartHourFemalePerson, dateEndHourFemalePerson, 'TOTAL DE MUJERES POR HORA DEL DÍA', `HORA MÁS TRANSITADA: ${maxHourPersonFemale.hour} CON ${formatNumber(maxHourPersonFemale.total)} PERSONAS`, false, toten)}
                            methodcsv={() => exportExcel('hour', dateStartHourFemalePerson, dateEndHourFemalePerson, 'DE-MUJERES-POR-HORA-DEL-DIA')}
                            methodshare={() => downloadImageDesktop('grafichourfemale', dateStartHourFemalePerson, dateEndHourFemalePerson, 'hour', 'P')}
                        />
                        }
                    </div>

                }


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

                    {weekPersonTotal.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficweek', dateStartWeekPerson, dateEndWeekPerson, 'TOTAL DE PERSONAS POR DÍA DE LA SEMANA', `DIA MÁS TRANSITADO: ${maxWeekPersonTotal.day} CON ${formatNumber(maxWeekPersonTotal.total)} PERSONAS`, false, toten)}
                        methodcsv={() => exportExcel('week', dateStartWeekPerson, dateEndWeekPerson, 'DE-PERSONAS-POR-DIA-DE-LA-SEMANA')}
                        methodshare={() => downloadImageDesktop('graficweek', dateStartWeekPerson, dateEndWeekPerson, 'week', 'P')}
                    />}
                </div>
                {toten !== 'CCPN003' &&
                    <div className="spaceXY d-block">
                        <h3 className="subTitle  text-center">TOTAL DE HOMBRES POR DÍA DE LA SEMANA</h3>
                        <span className="spaceBottom range-date text-center d-block">( {dateStartWeekMalePerson} - {dateEndWeekMalePerson} )</span>
                        {weekPersonMale.length > 0 && <ButtonWeekMale />}
                        <div className="detailGrafic spaceBottom">
                            <span className="detailMax">Día de la semana más transitado: {maxWeekPersonMale?.day} con {formatNumber(maxWeekPersonMale?.total)} personas</span>
                            {weekPersonMale.length > 0 && <DateWeekMale />}

                        </div>
                        <GraficLine data={weekPersonMale} label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día"
                            labelop="tránsito de Hombres"
                            scltxtlbl="Cantidad de Hombres"
                            id="graficweekmale"
                        />
                        {weekPersonMale.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficweekmale', dateStartWeekMalePerson, dateEndWeekMalePerson, 'TOTAL DE HOMBRES POR DÍA DE LA SEMANA', `DIA MÁS TRANSITADO: ${maxWeekPersonMale.day} CON ${formatNumber(maxWeekPersonMale.total)} PERSONAS`, false, toten)}
                            methodcsv={() => exportExcel('week', dateStartWeekMalePerson, dateEndWeekMalePerson, 'DE-HOMBRES-POR-DIA-DE-LA-SEMANA')}
                            methodshare={() => downloadImageDesktop('graficweekmale', dateStartWeekMalePerson, dateEndWeekMalePerson, 'week', 'P')}
                        />}
                    </div>
                }

                {toten !== 'CCPN003' &&
                    <div className="spaceXY d-block">
                        <h3 className="subTitle  text-center">TOTAL DE MUJERES POR DÍA DE LA SEMANA</h3>
                        <span className="spaceBottom range-date text-center d-block">( {dateStartWeekFemalePerson} - {dateEndWeekFemalePerson} )</span>
                        {weekPersonFemale.length > 0 && <ButtonWeekFemale />}
                        <div className="detailGrafic spaceBottom">
                            <span className="detailMax">Día de la semana más transitado: {maxWeekPersonFemale?.day} con {formatNumber(maxWeekPersonFemale?.total)} personas</span>
                            {weekPersonFemale.length > 0 && <DateWeekFemale />}

                        </div>
                        <GraficLine data={weekPersonFemale} label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día"
                            labelop="tránsito de Mujeres"
                            scltxtlbl="Cantidad de Mujeres"
                            id="graficweekfemale"
                        />
                        {weekPersonFemale.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficweekfemale', dateStartWeekFemalePerson, dateEndWeekFemalePerson, 'TOTAL DE MUJERES POR DÍA DE LA SEMANA', `DIA MÁS TRANSITADO: ${maxWeekPersonFemale.day} CON ${formatNumber(maxWeekPersonFemale.total)} PERSONAS`, false, toten)}
                            methodcsv={() => exportExcel('week', dateStartWeekFemalePerson, dateEndWeekFemalePerson, 'DE-MUJERES-POR-DIA-DE-LA-SEMANA')}
                            methodshare={() => downloadImageDesktop('graficweekfemale', dateStartWeekFemalePerson, dateEndWeekFemalePerson, 'week', 'P')}
                        />}
                    </div>
                }


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
                    {monthPersonTotal.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficmonth', dateStartMonthPerson, dateEndMonthPerson, 'TOTAL DE PERSONAS POR DÍA DEL MES', `DIA MÁS TRANSITADA: ${maxMonthPersonTotal.day} CON ${formatNumber(maxMonthPersonTotal.total)} PERSONAS`, false, toten)}
                        methodcsv={() => exportExcel('month', dateStartMonthPerson, dateEndMonthPerson, 'DE-PERSONAS-POR-DIA-DEL-MES')}
                        methodshare={() => downloadImageDesktop('graficmonth', dateStartMonthPerson, dateEndMonthPerson, 'month', 'P')}
                    />}
                </div>

                {toten !== 'CCPN003' &&
                    <div className="spaceXY d-block">
                        <h3 className="subTitle  text-center">ACUMULADO DE HOMBRES POR CADA DÍA DEL MES</h3>
                        <span className="spaceBottom range-date text-center d-block">( {dateStartMonthMalePerson} - {dateEndMonthMalePerson} )</span>
                        {monthPersonMale.length > 0 && <ButtonMonthMale />}
                        <div className="detailGrafic spaceBottom">
                            <span className="detailMax">Día del mes más transitado: {maxMonthPersonMale?.day} con {maxMonthPersonMale?.total} personas</span>
                            {monthPersonMale.length > 0 && <DateMonthMale />}

                        </div>
                        <GraficBar
                            data={monthPersonMale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            labelop="tránsito de Hombres"
                            scltxtlbl="Cantidad de Hombres"
                            id="graficmonthmale"
                        />
                        {monthPersonMale.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficmonthmale', dateStartMonthMalePerson, dateEndMonthMalePerson, 'TOTAL DE HOMBRES POR DÍA DEL MES', `DIA MÁS TRANSITADA: ${maxMonthPersonMale.day} CON ${formatNumber(maxMonthPersonMale.total)} PERSONAS`, false, toten)}
                            methodcsv={() => exportExcel('month', dateStartMonthMalePerson, dateEndMonthMalePerson, 'DE-HOMBRES-POR-DIA-DEL-MES')}
                            methodshare={() => downloadImageDesktop('graficmonthmale', dateStartMonthMalePerson, dateEndMonthMalePerson, 'month', 'P')}
                        />}
                    </div>
                }

                {toten !== 'CCPN003' &&
                    <div className="spaceXY d-block">
                        <h3 className="subTitle  text-center">ACUMULADO DE MUJERES POR CADA DÍA DEL MES</h3>
                        <span className="spaceBottom range-date text-center d-block">( {dateStartMonthFemalePerson} - {dateEndMonthFemalePerson} )</span>
                        {monthPersonFemale.length > 0 && <ButtonMonthFemale />}
                        <div className="detailGrafic spaceBottom">
                            <span className="detailMax">Día del mes más transitado: {maxMonthPersonFemale?.day} con {maxMonthPersonFemale?.total} personas</span>
                            {monthPersonFemale.length > 0 && <DateMonthFemale />}

                        </div>
                        <GraficBar
                            data={monthPersonFemale}
                            label="Tiempo (Días)"
                            dtsetbg="#0a18f1"
                            optionbg="#454545"
                            scalebg="#0502D3"
                            title="Día: "
                            labelop="tránsito de Personas"
                            scltxtlbl="Cantidad de Personas"
                            id="graficmonthfemale"
                        />
                        {monthPersonFemale.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficmonthfemale', dateStartMonthFemalePerson, dateEndMonthFemalePerson, 'TOTAL DE MUJERES POR DÍA DEL MES', `DIA MÁS TRANSITADA: ${maxMonthPersonFemale.day} CON ${formatNumber(maxMonthPersonFemale.total)} PERSONAS`, false, toten)}
                            methodcsv={() => exportExcel('month', dateStartMonthFemalePerson, dateEndMonthFemalePerson, 'DE-MUJERES-POR-DIA-DEL-MES')}
                            methodshare={() => downloadImageDesktop('graficmonthfemale', dateStartMonthFemalePerson, dateEndMonthFemalePerson, 'month', 'P')}
                        />}
                    </div>

                }

                <div className="spaceXY  d-block">
                    <h3 className="subTitle  text-center">TOTAL DE SEMANA ACUMULADO DE PERSONAS POR HORA DEL DÍA</h3>
                    <span className="spaceBottom range-date text-center d-block">( {dateStartHeatMap} - {dateEndHeatMap} )</span>
                    {heatmapPersonTotal.length > 0 && <ButtonHeatMap />}
                    <HeatMapDesktop data={heatmapPersonTotal} range={heatmapPersonRange} />
                </div>
                {toten !== 'CCPN003' &&
                    <div className="spaceXY  d-block">
                        <h3 className="subTitle  text-center">TOTAL ACUMULADO - GÉNERO</h3>
                        <span className="spaceBottom range-date text-center d-block">( {dateStartAgePerson} - {dateEndAgePerson} )</span>
                        {rangePersonAges.length > 0 && <ButtonRangeAges />}
                        <div className="detailGrafic spaceBottom">
                            <span className="detailMax"></span>
                            {rangePersonAges.length > 0 && <DateAgeRanges />}
                        </div>

                        <GraficCompare data={rangePersonAges} id="graficAgeRange" />
                        {rangePersonAges.length > 0 && <ButtonsExport methodpdf={() => exportPDFPerson('graficAgeRange', dateStartAgePerson, dateEndAgePerson, 'TOTAL ACUMULADO GENERO', ``, false, toten)}
                            methodcsv={() => console.log('invalid')}
                            methodshare={() => downloadImageDesktop('graficAgeRange', dateStartAgePerson, dateEndAgePerson, 'age', 'P')}
                        />}
                    </div>
                }


            </div>
        </Main>
    )
}
