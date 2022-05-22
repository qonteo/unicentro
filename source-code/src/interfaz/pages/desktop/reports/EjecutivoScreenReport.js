import React, { useEffect, useState } from 'react'
import { GraficBar } from '../../../ui/grafics/GraficBar';
import { GraficLine } from '../../../ui/grafics/GraficLine';
import { Main } from '../../../ui/layout/Main';
import jsPDF from 'jspdf'
import { toPng } from 'html-to-image'
import { fetchConToken } from '../../../../helpers/fetch';
import { format, subDays } from 'date-fns'
import { formatNumber } from '../../../../helpers/calculo';

export const EjecutivoScreenReport = ({ location, history }) => {

    const [dataFilter, setDataFilter] = useState({
        hours: [],
        week: [],
        month: [],
        progress: []
    })
    const [isLoading, setIsLoading] = useState(false);
    const [textGender, setTextGender] = useState('PERSONAS')
    useEffect(() => {
        (async () => {
            if (!location.state) {
                return history.push('/reportes/especifico')
            }
            let url = '?';
            Object.keys(location.state).forEach(c => url += `${c}=${location.state[c]}&`);
            url = url.substring(0, url.length - 1);
            const resp = await fetchConToken(`/reports/specific${url}`);
            const body = await resp.json();
            const hours = body.hours.map(h => { return { label: h.time, x: h.hour, y: h[location.state.gender] } });
            const week = body.week.map(h => { return { label: h.dow, x: h.dow, y: h[location.state.gender] } });
            const month = body.month.map(h => { return { label: h.day, x: h.day, y: h[location.state.gender] } });
            if(location.state.gender==='male'){
                setTextGender('HOMBRES')
            }
            if(location.state.gender==='female'){
                setTextGender('MUJERES')
            }
          
            setDataFilter(
                {
                    ...body,
                    hours,
                    week,
                    month
                }
            );

        })()
    }, [])


    const generar = async () => {
        console.log('Se genero!')
        const canvas = document.querySelector('#grafichour')
        const canvas2 = document.querySelector('#graficweek')
        const canvas3 = document.querySelector('#graficmonth ')
        let urlGHour = '';
        let urlGWeek = '';
        let urlGMonth = '';
        setIsLoading(true);
        await toPng(canvas).then((dataUrl) => urlGHour = dataUrl)
        await toPng(canvas2).then((dataUrl) => urlGWeek = dataUrl)
        await toPng(canvas3).then((dataUrl) => urlGMonth = dataUrl)


        const doc = new jsPDF('p', 'pt');
        const img = new Image()
        img.src = '/assets/images/pdf/logoleft.png'
        const img2 = new Image()
        img2.src = '/assets/images/pdf/logorigth.png'
        doc.addImage(img, 'png', 30, 10, 100, 20)
        doc.addImage(img2, 'png', 500, 13, 65, 15)


        doc.setFontSize(9);
        doc.setTextColor('0502D3');

        doc.text(30, 60, 'REPORTE EJUCUTIVO')



        doc.setFontSize(11);
        doc.setTextColor('262626');
        doc.text(170, 90, `TOTAL ${location.state.gender==='total' ?  'PERSONAS' : `${textGender}` } POR HORA DEL DÍA DE AYER`)

        doc.setFontSize(9);
        doc.setTextColor('0502D3');
        doc.text(30, 140, `HORA MÁS TRANSITADA: ${dataFilter.max_hour.hour} CON ${formatNumber(dataFilter?.max_hour?.total)} PERSONAS`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 140, `RANGO:${location.state.date_from} - ${location.state.date_to}`)

        doc.addImage(urlGHour, 'jpg', 80, 150, 430, 250);


        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(30, 420, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 420, `Tipo de tótem:  ${!location.state.resource ? 'tótem acumulado' : location.state.resource}`)


        doc.setFontSize(11);
        doc.setTextColor('262626');
        doc.text(170, 480, `TOTAL DE ${location.state.gender==='total' ?  'PERSONAS' : `${textGender}` } POR DÍA DE LA SEMANA`)


        doc.setFontSize(9);
        doc.setTextColor('black');
        doc.text(30, 530, `DÍA DE LA SEMANA MÁS TRANSITADO: ${dataFilter.max_week_day.day} CON ${formatNumber(dataFilter?.max_week_day?.total)} PERSONAS`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 530, `RANGO:${location.state.date_from} - ${location.state.date_to}`)

        doc.addImage(urlGWeek, 'jpg', 80, 540, 430, 250);

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(30, 810, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 810, `Tipo de tótem:  ${!location.state.resource ? 'tótem acumulado' : location.state.resource}`)

        doc.addPage();

        doc.addImage(img, 'png', 30, 20, 100, 20)
        doc.addImage(img2, 'png', 500, 20, 65, 15)


        doc.setFontSize(11);
        doc.setTextColor('black');
        doc.text(170, 80, `ACUMULADO DE ${location.state.gender==='total' ?  'PERSONAS' : `${textGender}` } POR CADA DÍA DEL MES`)

        doc.setFontSize(9);
        doc.setTextColor('black');
        doc.text(30, 130, `DÍA DEL MES MAS TRANSITADO: ${dataFilter.max_month_day.day} CON ${formatNumber(dataFilter?.max_month_day?.total)} PERSONAS`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 130, `RANGO:${location.state.date_from} - ${location.state.date_to}`)

        doc.addImage(urlGMonth, 'jpg', 80, 140, 430, 250);

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(30, 410, `Reporte generado el ${format(new Date(), 'yyyy-MM-dd')} - ${format(new Date(), 'HH:mm')} hrs/PE.CCPN.01`)

        doc.setFontSize(9);
        doc.setTextColor('424242');
        doc.text(440, 410, `Tipo de tótem:  ${!location.state.resource ? 'tótem acumulado' : location.state.resource}`)

        const salida = doc.output('blob');
        const formData = new FormData();
        formData.append('upload_file', salida);
        formData.append('name', `DSP-SODA-CCPN-PE-A01-${(location.state.date_from).replaceAll('-', '')}-${(location.state.date_to).replaceAll('-', '')}-REPORTE-EJECUTIVO.pdf`);



        doc.save(`DSP-SODA-CCPN-PE-A01-${(location.state.date_from).replaceAll('-','')}-${(location.state.date_to).replaceAll('-','')}-REPORTE-COMERICAL.pdf`)
        setIsLoading(false);
        const resp = await (await fetchConToken(`/reports/upload-file`, formData, 'UPLOAD')).json();

    }



    return (
        <Main>
            <div className="contenedor">
                <h3 className="subTitle spaceTop">REPORTE EJECUTIVO</h3>
                <div className="spaceXY d-block">
                    <h3 className="subTitle  text-center spaceBottomSmall">TOTAL {location.state.gender==='total' ?  'PERSONAS' : `${textGender}` } POR HORA DEL DÍA DE AYER</h3>

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
                        scalebg="#0502D3" id="grafichour"
                        id="grafichour"
                        theme="bg-yellow"
                    />

                </div>


                <div className="spaceXY d-block">
                    <h3 className="subTitle  text-center spaceBottomSmall">TOTAL DE {location.state.gender==='total' ?  'PERSONAS' : `${textGender}` } POR DÍA DE LA SEMANA</h3>

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
                    <h3 className="subTitle  text-center spaceBottomSmall">ACUMULADO DE {location.state.gender==='total' ?  'PERSONAS' : `${textGender}` } POR CADA DÍA DEL MES</h3>
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
                        theme="bg-yellow"
                        id="graficmonth"
                    />
                </div>


                <div className="groupButtons text-center spaceXY">

                    <button disabled={isLoading} onClick={generar} className={`filterBtn active`}>{!isLoading ? 'GENERAR REPORTE' : 'CARGANDO...'}</button>

                </div>

            </div>
        </Main>
    )
}
