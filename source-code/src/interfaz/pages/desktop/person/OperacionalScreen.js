import React, { useState } from 'react'
import { useButtonsReport } from '../../../../hooks/useButtonsReport'
import { Main } from '../../../ui/layout/Main'
import jsPDF from 'jspdf'
import { toPng } from 'html-to-image'
export const OperacionalScreen = () => {

    const [EquipoHtmlBtn, valueEquipo, setEquipo] = useButtonsReport({ todos: 'TODOS', toten1: 'TÓTEM 1', toten2: 'TÓTEM 2' })
    const [PeriodoHtmlBtn, valuePeriodo, setPeriodo] = useButtonsReport({ todos: 'TODOS', 7: '07 DÍAS', 15: '15 DÍAS', 30: '30 DÍAS' })
    const [isLoading, setIsLoading] = useState(false);
    const generar=()=>{
        const imgExport = document.querySelector('#exportTable');
        setIsLoading(true);
        toPng(imgExport).then((dataUrl) => {

            const doc = new jsPDF('l', 'pt');
            const img = new Image()
            img.src = '/assets/images/pdf/logoleft.png'
            const img2 = new Image()
            img2.src = '/assets/images/pdf/logorigth.png'
            doc.addImage(img, 'png', 30, 10, 100, 20)
            doc.addImage(img2, 'png', 750, 13, 65, 15)

            doc.setFontSize(14);
            doc.setTextColor('0502D3');

            doc.text(30, 80, 'REPORTE OPERACIONAL')


            doc.setFontSize(12);
            doc.setTextColor('262626');
            doc.text(30, 100, 'ULTIMOS 7 DÍAS')

            doc.setFontSize(12);
            doc.setTextColor('0502D3');
            doc.text(30, 160, 'STATUS DE DISPOSITIVOS')

            doc.setFontSize(9);
            doc.setTextColor('0502D3');
            doc.text(30, 200, 'HORA MÁS TRANSITADA: 23H CON 6740 PERSONAS')
    
            doc.setFontSize(9);
            doc.setTextColor('424242');
            doc.text(680, 200, 'RANGO:23/01/2021-26/01/2021')



            doc.addImage(dataUrl, 10, 200, 830, 250)



            doc.setFontSize(9);
            doc.setTextColor('424242');
            doc.text(30, 460, 'Reporte generado el 26/01/2021 - 19:43hrs/PE.CCPN.01')
    
            doc.setFontSize(9);
            doc.setTextColor('424242');
            doc.text(680, 460, 'Tipo de tótem: tótem acumulado')



            doc.save('DSP-SODA-CCPN-PE-A01-20210216-20210223-REPORTE-OPERACIONAL.pdf');
            
            setIsLoading(false);
        })
    }


    return (
        <Main>
             <h3 className="subTitle spaceXY">REPORTE OPERACIONAL</h3>          
            <div className="d-grid-report  content-btntext">
                <p className="text-report">Seleccione equipo:</p>
                <EquipoHtmlBtn />
            </div>
            <div className="d-grid-report  content-btntext">
                <p className="text-report">Seleccione Periodo:</p>
                <PeriodoHtmlBtn />
            </div>

            <div className="groupButtons text-center spaceXY">
                <button /* onClick={generar} */ className={`filterBtn`}>GENERAR</button>
            </div>



            <div id="exportTable" className="contentTableSensor ">
                    <table id="sensoresTable"  >
                        <thead>
                            <tr>
                                <th></th>
                                <th>DOM</th>
                                <th>LUN</th>
                                <th>MAR</th>
                                <th>MIÉ</th>
                                <th>JUE</th>
                                <th>VIE</th>
                                <th>SÁB</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>TOTEM 1</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                            </tr>
                            <tr>
                                <td>TOTEM 2</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                                <td>Activo</td>
                            </tr>
                        </tbody>

                    </table>
                </div>


                <div className="groupButtons text-center spaceXY">
                <button onClick={generar} className={`filterBtn active`}>{!isLoading ? 'GENERAR REPORTE'  : 'CARGANDO...'}</button>
            </div>



        </Main>
    )
}
