import React,{useEffect} from 'react'
import jsPDF from 'jspdf'

export const ComercialAuto = ({location}) => {
    useEffect(() => {
        (() => {
            localStorage.setItem('path-preview-qonteo', location.pathname);
        })()
    }, [])
    useEffect(() => {
        const doc = new jsPDF('p', 'pt');

        doc.setFontSize(9);
        doc.setTextColor(10, 24, 241);
        doc.text(30, 60, 'REPORTE COMERCIAL')
        doc.save(`DSP-SODA-CCPN-PE-A01-REPORTE-COMERICAL.pdf`);
        
    }, [])
    return (
        <div>
            
        </div>
    )
}

