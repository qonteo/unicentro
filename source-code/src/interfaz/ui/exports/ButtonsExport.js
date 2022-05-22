import React from 'react'

export const ButtonsExport = ({methodpdf,methodcsv,methodshare}) => {
    return (
        <div className="btnExportsGraphics">
            <button onClick={methodcsv}><img src="/assets/icons/downloadcsv.svg" /></button>
            <button onClick={methodpdf}><img src="/assets/icons/Impresion.svg" /></button>
            <button onClick={methodshare}><img src="/assets/icons/share.svg" /></button>
        </div>
    )
}
