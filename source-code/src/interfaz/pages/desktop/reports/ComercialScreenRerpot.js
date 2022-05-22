import React, { useEffect, useState } from 'react'
import { Main } from '../../../ui/layout/Main'
import jsPDF from 'jspdf'
import { toPng } from 'html-to-image'
import { BoxDate } from '../../../ui/utils/boxes/BoxDate'
import { BoxWithOutPercent } from '../../../ui/utils/boxes/BoxWithOutPercent'
import { BoxWithPercent } from '../../../ui/utils/boxes/BoxWithPercent'
import { BoxDateRange } from '../../../ui/utils/boxes/BoxDateRange'
import { BoxGender } from '../../../ui/utils/boxes/BoxGender'
import { GraficBar } from '../../../ui/grafics/GraficBar'
import { GraficLine } from '../../../ui/grafics/GraficLine'
import { fetchConToken } from '../../../../helpers/fetch'
import { format, subDays, differenceInDays } from 'date-fns'
import { formatNumber } from '../../../../helpers/calculo'

export const ComercialScreenReport = ({ location, history }) => {
    const [dataFilter, setDataFilter] = useState({
        hours: [],
        week: [],
        month: [],
        progress: []
    })
    const [isLoading, setIsLoading] = useState(false);
    const [textGender, setTextGender] = useState('PERSONAS');
    const [differenceInDay, setDifferenceInDay] = useState('7');
    useEffect(() => {
        (async () => {
            if (!location.state) {
                history.push('/reportes/especifico')
            }
            console.log(location.state)
            setDifferenceInDay(differenceInDays(new Date(location.state.date_to), new Date(location.state.date_from)));

            let url = '?';
            Object.keys(location.state).forEach(c => url += `${c}=${location.state[c]}&`);
            url = url.substring(0, url.length - 1);

            const resp = await (await fetchConToken(`/reports/specific${url}`)).json();
            const hours = resp.hours.map(h => { return { label: h.time, x: h.hour, y: h[location.state.gender] } });
            const week = resp.week.map(h => { return { label: h.dow, x: h.dow, y: h[location.state.gender] } });
            const month = resp.month.map(h => { return { label: h.day, x: h.day, y: h[location.state.gender] } });
            let progress;
            if (location.state.gender === 'total') {
                progress = resp.progress;
            } else {
                progress = resp.progress.filter(c => c.name === location.state.gender || c.name === 'total');
            }
            if (location.state.gender === 'male') {
                setTextGender('HOMBRES')
            }
            if (location.state.gender === 'female') {
                setTextGender('MUJERES')
            }

            progress = progress.map(p => {
                if (p.name === 'male') {
                    p.name = 'HOMBRES'
                }
                if (p.name === 'female') {
                    p.name = 'MUJERES'
                }
                if (p.name === 'total') {
                    p.name = 'TOTAL'
                }
                return p;
            });
            setDataFilter(
                {
                    ...resp,
                    progress,
                    hours,
                    week,
                    month
                }
            );

        })()
    }, [])


    const generarPdf = async () => {
        const elementGrilla = document.getElementById('exportGrilla');
        /*      const elementProgress = document.getElementById('exportProgress'); */
        const graficHour = document.querySelector('#grafichour');

        const graficWeek = document.querySelector('#graficweek');
        const graficMonth = document.querySelector('#graficmonth');
        let urlGrilla = '';
        /*     let urlProgress = ''; */
        let urlGHour = '';
        let urlGWeek = '';
        let urlGMonth = '';

        setIsLoading(true);
        await toPng(elementGrilla).then((dataUrl) => urlGrilla = dataUrl)
        /*     await toPng(elementProgress).then((dataUrl) => urlProgress = dataUrl) */

        await toPng(graficHour).then((dataUrl) => urlGHour = dataUrl)
        await toPng(graficWeek).then((dataUrl) => urlGWeek = dataUrl)
        await toPng(graficMonth).then((dataUrl) => urlGMonth = dataUrl)

        const doc = new jsPDF('p', 'pt');
        const img = new Image()
        img.src = '/assets/images/pdf/logoleft.png'
        const img2 = new Image()
        img2.src = '/assets/images/pdf/logorigth.png'
        doc.addImage(img, 'png', 30, 10, 100, 20)
        doc.addImage(img2, 'png', 500, 13, 65, 15)

        doc.setFontSize(9);
        doc.setTextColor(10, 24, 241);
        doc.text(30, 60, 'REPORTE COMERCIAL')

        doc.setFontSize(9);
        doc.setTextColor('black');
        doc.text(30, 80, `ULTIMOS ${differenceInDay} DIAS`)

        doc.addImage(urlGrilla, 'jpg', 60, 90, 480, 280);
        /*************************************************************************** */

        doc.setFontSize(11);
        doc.setTextColor('262626');
        doc.text(170, 430, `TOTAL DE ${location.state.gender === 'total' ? 'PERSONAS' : `${textGender}`} POR HORA DEL DÍA DE AYER`)

        doc.setFontSize(9);
        doc.setTextColor('0502D3');
        doc.text(30, 480, `HORA MÁS TRANSITADA: ${dataFilter.max_hour.hour} CON ${formatNumber(dataFilter?.max_hour?.total)} PERSONAS`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 480, `RANGO:${location.state.date_from} - ${location.state.date_to}`)

        doc.addImage(urlGHour, 'jpg', 80, 490, 430, 250);

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(30, 760, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 760, `Tipo de tótem:  ${!location.state.resource ? 'tótem acumulado' : location.state.resource}`)



        /***************************************************************************** */
        doc.addPage();
        doc.addImage(img, 'png', 30, 10, 100, 20)
        doc.addImage(img2, 'png', 500, 13, 65, 15)

        doc.setFontSize(11);
        doc.setTextColor('262626');
        doc.text(170, 90, `TOTAL DE ${location.state.gender === 'total' ? 'PERSONAS' : `${textGender}`} POR DÍA DE LA SEMANA`)


        doc.setFontSize(9);
        doc.setTextColor('black');
        doc.text(30, 140, `DÍA DE LA SEMANA MÁS TRANSITADO: ${dataFilter.max_week_day.day} CON ${formatNumber(dataFilter?.max_week_day?.total)} PERSONAS`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 140, `RANGO:${location.state.date_from} - ${location.state.date_to}`)

        doc.addImage(urlGWeek, 'jpg', 80, 150, 430, 250);

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(30, 420, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 420, `Tipo de tótem:  ${!location.state.resource ? 'tótem acumulado' : location.state.resource}`)
        /******************************************************** */


        doc.setFontSize(11);
        doc.setTextColor('black');
        doc.text(170, 480, `ACUMULADO DE ${location.state.gender === 'total' ? 'PERSONAS' : `${textGender}`} POR CADA DÍA DEL MES`)

        doc.setFontSize(9);
        doc.setTextColor('black');
        doc.text(30, 530, `DÍA DEL MES MAS TRANSITADO: ${dataFilter.max_month_day.day} CON ${formatNumber(dataFilter?.max_month_day?.total)} PERSONAS`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 530, `RANGO:${location.state.date_from} - ${location.state.date_to}`)



        doc.addImage(urlGMonth, 'jpg', 80, 540, 430, 250);

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(30, 810, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 810, `Tipo de tótem:  ${!location.state.resource ? 'tótem acumulado' : location.state.resource}`)

         const salida = doc.output('blob');
         const formData = new FormData();
         formData.append('file', salida);
         formData.append('name', `DSP-SODA-CCPN-PE-A01-${(location.state.date_from).replaceAll('-', '')}-${(location.state.date_to).replaceAll('-', '')}-REPORTE-COMERICAL.pdf`);
 
 
        doc.save(`DSP-SODA-CCPN-PE-A01-${(location.state.date_from).replaceAll('-', '')}-${(location.state.date_to).replaceAll('-', '')}-REPORTE-COMERICAL.pdf`);
        setIsLoading(false);
        //esta en ultima cola 
  /*       const resp = await (await fetchConToken(`/reports/upload-file`, formData, 'UPLOAD')).json();
   */  }
    return (
        <Main>
            <div className="contenedor">
                {/*       <TitleHead>Personas</TitleHead> */}
                <h3 className="subTitle spaceTop">REPORTE COMERCIAL</h3>

                <h3 className="subTitle spaceTopSmall color-secundary">ULTIMOS {differenceInDay} DÍAS</h3>

                <div className="spaceXY" id="exportGrilla">

                    <div className="boxGridFour">
                        <BoxDate count={dataFilter?.boxes?.today?.count} percent={dataFilter?.boxes?.today?.percent} />
                        <BoxWithOutPercent theme="light" count={dataFilter?.boxes?.yesterday?.total} />
                        <BoxWithPercent theme="light" count={dataFilter?.boxes?.week?.total} percent={dataFilter?.boxes?.week?.percent} />
                        <BoxDateRange theme="light" count={dataFilter?.boxes?.total?.count} />
                    </div>

                    {(location.state?.gender == 'total' || location.state?.gender == 'male') && (
                        <div className="boxGridFour spaceTop">
                            <BoxGender gender="male" count={dataFilter?.boxes?.today?.male} total={dataFilter?.boxes?.today?.count} txtDay="HOY" />
                            <BoxGender gender="male" count={dataFilter?.boxes?.yesterday?.male} total={dataFilter?.boxes?.yesterday?.total} txtDay="AYER" theme="light" />
                            <BoxGender gender="male" count={dataFilter?.boxes?.week?.male} total={dataFilter?.boxes?.week?.total} txtDay="ESTA SEMANA" theme="light" />
                            <BoxGender gender="male" count={dataFilter?.boxes?.total?.male} total={dataFilter?.boxes?.total?.count} txtDay="TOTAL" theme="light" />
                        </div>
                    )}
                    {(location.state?.gender == 'total' || location.state?.gender == 'female') && (
                        <div className="boxGridFour spaceTop">
                            <BoxGender gender="female" count={dataFilter?.boxes?.today?.female} total={dataFilter?.boxes?.today?.count} txtDay="HOY" />
                            <BoxGender gender="female" count={dataFilter?.boxes?.yesterday?.female} total={dataFilter?.boxes?.yesterday?.total} txtDay="AYER" theme="light" />
                            <BoxGender gender="female" count={dataFilter?.boxes?.week?.female} total={dataFilter?.boxes?.week?.total} txtDay="ESTA SEMANA" theme="light" />
                            <BoxGender gender="female" count={dataFilter?.boxes?.total?.female} total={dataFilter?.boxes?.total?.count} txtDay="TOTAL" theme="light" />
                        </div>
                    )}


                </div>
                {/* <div className="spaceXY ">
                    <h3 className="subTitle  text-center color-secundary">TIEMPO PROMEDIO DE ESTANCIA POR GENERÓ</h3>
                    <span className="spaceBottom text-center d-block">( {location.state.date_from} - {location.state.date_to} )</span>
                    <div id="exportProgress">
                        <div className="tablePallete ">
                            <span>Generó</span>
                            <div className="pallete">
                                <div className="color">
                                    <span>HOY</span>
                                    <span className="bg-yellow barra"></span>
                                </div>
                                <div className="color">
                                    <span>SEMANA</span>
                                    <span className="bg-blue barra"></span>
                                </div>
                                <div className="color">
                                    <span>MES</span>
                                    <span className="bg-ligthBlue barra"></span>
                                </div>
                            </div>
                        </div>
                        <div className="progressContent spaceTop">
                            {dataFilter.length === 0 && <div className="__loader_grafic">
                                <img src="/assets/load/qonteo.gif" alt="spinner_loaded" />
                            </div>}
                            {dataFilter.progress.map((p, _i) => (
                                
                                <div key={_i} className="iconProgrese">
                                    <div className="icon">
                                        <img src="/assets/icons/person.svg" alt="iconTotal" />
                                        <span>{p.name}</span>
                                    </div>
                                    <div className="percentProgress">
                                        {p.bars.map((b, _i) => (
                                            <div key={_i} className="progress">
                                                <div className={`percent bg-${b.bg} `} style={{ width: `${b.percent}%` }}>
                                                    <span className={`${b.bg == 'blue' ? 'textWhite' : ''} `} >{b.minutes} Minutos</span>
                                                </div>
                                                <span>{b.percent}%</span>
                                            </div>

                                        ))}
                                    </div>




                                </div>


                            ))}

                        </div>

                    </div>

                </div>
                */}
                <div className="spaceXY d-block">
                    <h3 className="subTitle  text-center spaceBottomSmall">TOTAL DE {location.state.gender === 'total' ? 'PERSONAS' : `${textGender}`} POR HORA DEL DÍA DE AYER</h3>
                    <div className="detailGrafic spaceBottom">
                        <span className="detailMax">Hora más transitada: {dataFilter.max_hour?.hour} con {dataFilter.max_hour?.total} personas</span>
                        <span className="detailMax">RANGO:{location.state.date_from} - {location.state.date_to}</span>

                    </div>
                    <GraficBar data={dataFilter.hours} label="Total de Hombres" dtsetbg="#0502D3"
                        optionbg="#454545"
                        legendbg="#454545"
                        title=" Hora:"
                        labelop=" Total de Hombres:"
                        scltxtlbl="Cantidad de Hombres"
                        scalebg="#0502D3" id="grafichourMale"
                        id="grafichour"
                        theme="bg-yellow"
                    />

                </div>


                <div className="spaceXY d-block">
                    <h3 className="subTitle  text-center spaceBottomSmall">TOTAL DE {location.state.gender === 'total' ? 'PERSONAS' : `${textGender}`} POR DÍA DE LA SEMANA</h3>
                    <div className="detailGrafic spaceBottom">
                        <span className="detailMax">Día de la semana más transitado: {dataFilter.max_week_day?.day} con {dataFilter.max_week_day?.total} personas</span>
                        <span className="detailMax">RANGO:{location.state.date_from} - {location.state.date_to}</span>

                    </div>
                    <GraficLine data={dataFilter.week} label="Tiempo (Días)"
                        dtsetbg="#0a18f1"
                        optionbg="#454545"
                        scalebg="#0502D3"
                        title="Día"
                        labelop="tránsito de personas"
                        scltxtlbl="Cantidad de Personas"
                        id="graficweek"

                    />


                </div>


                <div className="spaceXY d-block">
                    <h3 className="subTitle  text-center spaceBottomSmall">ACUMULADO DE {location.state.gender === 'total' ? 'PERSONAS' : `${textGender}`} POR CADA DÍA DEL MES</h3>
                    <div className="detailGrafic spaceBottom">
                        <span className="detailMax">Día del mes más transitado: {dataFilter.max_month_day?.day} con {dataFilter.max_month_day?.total} personas</span>
                        <span className="detailMax">RANGO:{location.state.date_from} - {location.state.date_to}</span>

                    </div>
                    <GraficBar
                        data={dataFilter.month}
                        label="Tiempo (Días)"
                        dtsetbg="#0a18f1"
                        optionbg="#454545"
                        scalebg="#0502D3"
                        title="Día: "
                        labelop="tránsito de Personas"
                        scltxtlbl="Cantidad de Personas"
                        theme="bg-primary"
                        id="graficmonth"
                    />

                </div>


                <div className="groupButtons text-center spaceXY">

                    <button disabled={isLoading} onClick={generarPdf} className={`filterBtn active`}>{!isLoading ? 'GENERAR REPORTE' : 'CARGANDO...'}</button>

                </div>



            </div>


        </Main>
    )
}
