import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import { toPng } from 'html-to-image'
import { BoxDate } from '../../ui/utils/boxes/BoxDate'
import { BoxWithOutPercent } from '../../ui/utils/boxes/BoxWithOutPercent'
import { BoxWithPercent } from '../../ui/utils/boxes/BoxWithPercent'
import { BoxDateRange } from '../../ui/utils/boxes/BoxDateRange'
import { Main } from '../../ui/layout/Main'
import { GraficBar } from '../../ui/grafics/GraficBar'
import { GraficLine } from '../../ui/grafics/GraficLine'
import { fetchConToken } from '../../../helpers/fetch'
import { BoxGender } from '../../ui/utils/boxes/BoxGender'
import { formatNumber } from '../../../helpers/calculo'
import { format } from 'date-fns'
export const ExportReport = () => {
    const [dataFilter, setDataFilter] = useState({
        hours: [],
        week: [],
        month: [],
        progress: []
    })

    useEffect(() => {
        (async () => {

            const resp = await (await fetch(`https://dashboard.qonteo.com/REST/reports/specific?report_type=c`, {
                headers: {
                    'Content-type': 'Application/json',
                    'Authorization': 'bear eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eydzdWInOiAnNDQyNDQ4JywgJ2lhdCc6IDE1OTg4ODczOTl9.20f471933ae0a9c58d525f4ab0c1eef7adab03f17c3bbe18a00cf30a1ef06948'
                }
            })).json();
            console.log(resp)
            const hours = resp.hours.map(h => { return { label: h.time, x: h.hour, y: h.total } });
            const week = resp.week.map(h => { return { label: h.dow, x: h.dow, y: h.total } });
            const month = resp.month.map(h => { return { label: h.day, x: h.day, y: h.total } });

            setDataFilter(
                {
                    ...resp,
                    hours,
                    week,
                    month
                }
            );

        })()
    }, [])

    useEffect(() => {
        (async () => {
            if (dataFilter.hours.length > 0) {
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

                doc.addImage(urlGrilla, 'jpg', 60, 90, 480, 280);
                /*************************************************************************** */

                doc.setFontSize(11);
                doc.setTextColor('262626');
                doc.text(170, 430, `TOTAL DE  PERSONAS POR HORA DEL DÍA DE AYER`)

                doc.setFontSize(9);
                doc.setTextColor('0502D3');
                doc.text(30, 480, `HORA MÁS TRANSITADA: ${dataFilter.max_hour.hour} CON ${formatNumber(dataFilter?.max_hour?.total)} PERSONAS`)


                doc.addImage(urlGHour, 'jpg', 80, 490, 430, 250);

                doc.setFontSize(9);
                doc.setTextColor('424242');
                doc.text(30, 760, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)




                /***************************************************************************** */
                doc.addPage();
                doc.addImage(img, 'png', 30, 10, 100, 20)
                doc.addImage(img2, 'png', 500, 13, 65, 15)

                doc.setFontSize(11);
                doc.setTextColor('262626');
                doc.text(170, 90, 'TOTAL DE PERSONAS POR DÍA DE LA SEMANA')


                doc.setFontSize(9);
                doc.setTextColor('black');
                doc.text(30, 140, `DÍA DE LA SEMANA MÁS TRANSITADO: ${dataFilter.max_week_day.day} CON ${formatNumber(dataFilter?.max_week_day?.total)} PERSONAS`)

                doc.addImage(urlGWeek, 'jpg', 80, 150, 430, 250);

                doc.setFontSize(9);
                doc.setTextColor('424242');
                doc.text(30, 420, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)

                /******************************************************** */


                doc.setFontSize(11);
                doc.setTextColor('black');
                doc.text(170, 480, `ACUMULADO DE PERSONAS POR CADA DÍA DEL MES`)

                doc.setFontSize(9);
                doc.setTextColor('black');
                doc.text(30, 530, `DÍA DEL MES MAS TRANSITADO: ${dataFilter.max_month_day.day} CON ${formatNumber(dataFilter?.max_month_day?.total)} PERSONAS`)




                doc.addImage(urlGMonth, 'jpg', 80, 540, 430, 250);

                doc.setFontSize(9);
                doc.setTextColor('424242');
                doc.text(30, 810, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)

                const salida = doc.output('blob');
                const formData = new FormData();
                formData.append('upload_file', salida);
                formData.append('name', `DSP-SODA-CCPN-PE-A01-REPORTE-COMERICAL.pdf`);

               
                const resp = await (await fetch(`https://dashboard.qonteo.com/REST/reports/upload-file`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'bear eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eydzdWInOiAnNDQyNDQ4JywgJ2lhdCc6IDE1OTg4ODczOTl9.20f471933ae0a9c58d525f4ab0c1eef7adab03f17c3bbe18a00cf30a1ef06948'
                    },
                    body: formData
                })).json();
                console.log(resp)
            }
        })()
    }, [dataFilter])

    return (
        <Main isSidebar={false}>
            <div className="contenedor">
                {/*       <TitleHead>Personas</TitleHead> */}
                <h3 className="subTitle spaceTop">REPORTE COMERCIAL</h3>

                <h3 className="subTitle spaceTopSmall color-secundary">ULTIMOS  DÍAS</h3>

                <div className="spaceXY" id="exportGrilla">

                    <div className="boxGridFour">
                        <BoxDate count={dataFilter?.boxes?.today?.count} percent={dataFilter?.boxes?.today?.percent} />
                        <BoxWithOutPercent theme="light" count={dataFilter?.boxes?.yesterday?.total} />
                        <BoxWithPercent theme="light" count={dataFilter?.boxes?.week?.total} percent={dataFilter?.boxes?.week?.percent} />
                        <BoxDateRange theme="light" count={dataFilter?.boxes?.total?.count} />
                    </div>

                    <div className="boxGridFour spaceTop">
                        <BoxGender gender="male" count={dataFilter?.boxes?.today?.male} total={dataFilter?.boxes?.today?.count} txtDay="HOY" />
                        <BoxGender gender="male" count={dataFilter?.boxes?.yesterday?.male} total={dataFilter?.boxes?.yesterday?.total} txtDay="AYER" theme="light" />
                        <BoxGender gender="male" count={dataFilter?.boxes?.week?.male} total={dataFilter?.boxes?.week?.total} txtDay="ESTA SEMANA" theme="light" />
                        <BoxGender gender="male" count={dataFilter?.boxes?.total?.male} total={dataFilter?.boxes?.total?.count} txtDay="TOTAL" theme="light" />
                    </div>
                    <div className="boxGridFour spaceTop">
                        <BoxGender gender="female" count={dataFilter?.boxes?.today?.female} total={dataFilter?.boxes?.today?.count} txtDay="HOY" />
                        <BoxGender gender="female" count={dataFilter?.boxes?.yesterday?.female} total={dataFilter?.boxes?.yesterday?.total} txtDay="AYER" theme="light" />
                        <BoxGender gender="female" count={dataFilter?.boxes?.week?.female} total={dataFilter?.boxes?.week?.total} txtDay="ESTA SEMANA" theme="light" />
                        <BoxGender gender="female" count={dataFilter?.boxes?.total?.female} total={dataFilter?.boxes?.total?.count} txtDay="TOTAL" theme="light" />
                    </div>



                </div>

                <div className="spaceXY d-block">
                    <h3 className="subTitle  text-center spaceBottomSmall">TOTAL DE PERSONAS POR HORA DEL DÍA DE AYER</h3>
                    <div className="detailGrafic spaceBottom">
                        <span className="detailMax">Hora más transitada: {dataFilter.max_hour?.hour} con {dataFilter.max_hour?.total} personas</span>
                        {/*   <span className="detailMax">RANGO: - </span> */}

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
                    <h3 className="subTitle  text-center spaceBottomSmall">TOTAL DE PERSONAS POR DÍA DE LA SEMANA</h3>
                    <div className="detailGrafic spaceBottom">
                        <span className="detailMax">Día de la semana más transitado: {dataFilter.max_week_day?.day} con {dataFilter.max_week_day?.total} personas</span>
                        {/*  <span className="detailMax">RANGO: - </span> */}

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
                    <h3 className="subTitle  text-center spaceBottomSmall">ACUMULADO DE PERSONAS POR CADA DÍA DEL MES</h3>
                    <div className="detailGrafic spaceBottom">
                        <span className="detailMax">Día del mes más transitado: {dataFilter.max_month_day?.day} con {dataFilter.max_month_day?.total} personas</span>
                        {/*  <span className="detailMax">RANGO: - </span> */}

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





            </div>


        </Main>
    )
}
