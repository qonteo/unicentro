import jsPDF from 'jspdf'
import { toPng } from 'html-to-image'
import {saveAs} from 'file-saver'
import { fetchConToken } from "./fetch";
import {format} from 'date-fns'

/**
 * @module Helpers
 */

/**
 * funcion para exportar PDF
 * @param {String} grafic Grafico a impimir
 * @param {String} startdate fecha de inicio
 * @param {String} enddate fechad de fin
 * @param {String} title Titulo
 * @param {String} text texto
 * @param {String} year año
 * @param {*} totem 
 */
const exportPDFPerson =async (grafic,startdate,enddate,title,text,year,totem=0) => {
    let url='';
    const elementPng = document.getElementById(grafic);
    const doc = new jsPDF('l', 'pt');
    const img = new Image()
    img.src = './assets/images/pdf/logoleft.png'
    doc.addImage(img, 'png', 30, 10, 100, 20)
    const img2 = new Image()
    img2.src = './assets/images/pdf/logorigth.png'
    doc.addImage(img2, 'png', 750, 13, 65, 15)

    doc.setFontSize(18);
    doc.text(280, 90, title)

    doc.setFontSize(9);
    doc.text(650, 140, `Rango: ${startdate} - ${enddate}`)

    doc.setFontSize(9);
    doc.text(50, 140, text)
    await toPng(elementPng).then(urlG=>url=urlG);
    doc.addImage(url, 'jpg', 120, 180, 600, 350);

    doc.setFontSize(9);
    doc.text(50, 570, `Reporte generado ${format(new Date(),'yyyy-MM-dd HH:mm:ss')} PE.CCPN.01`)

    doc.setFontSize(9);
    let totemText='Acumulado'
    if (Number(totem) === 1) {
        totemText='totem 1'
    } else if (Number(totem) === 2){
        totemText='totem 2'
        
    }
    doc.text(650, 570, `Tipo de totem: ${totemText}`)
    

    doc.save(`DSP-SODA-PE.CCPN.01-${startdate}-${enddate}-${title.replace(/\s/g, '-')}.pdf.pdf`)
}


const processExcel = async (type, interval, dateFrom, dateTo) => {
    const peticion = await fetchConToken('/export', {
        "type": type,
        "format": "csv",
        "interval": interval,
        "date_from": dateFrom,
        "date_to": dateTo
    }, 'POST')
    const json = await peticion.blob();
    return json;
}

const exportExcel = (type, startdate, enddate, filename) => {
    processExcel('p', type, startdate, enddate).then(r => saveAs(r, `DSP-SODA-CO-PMXCO-BOG-A01-${startdate}-${enddate}-TOTAL-${filename}.csv`))
}

const downloadImageDesktop=async (grafic,datestart,enddate,type,interval)=>{
    let urlg='';
    const elementPng = document.getElementById(grafic);
  /*   const cloneElement=elementPng.cloneNode(true);
     */
    const linkHref = document.createElement('a');
    await toPng(elementPng).then(urlG=>urlg=urlG);
    fetchConToken('/upload-image', {
        data: {
            user_id: "704",
            type,
            interval,
            date_from: datestart,
            date_to:  enddate  ,
            image: urlg
        }
    }, 'POST').then(resp => resp.json()).then((resp) => {
        linkHref.setAttribute('target', '__blank');
        linkHref.href = resp.url;
        linkHref.click();
    })
}

export {
    exportPDFPerson,
    exportExcel,
    downloadImageDesktop
}