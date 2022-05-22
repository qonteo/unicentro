import React from 'react'
import { formatNumber } from '../../../../helpers/calculo'

export const BoxWithOutPercent = ({theme="dark",count=0,txtdetail='Personas en Total'}) => {
    return (
        <div className={`boxUI flex ${theme}`}>
            <div className="content">
            <div className="boxBody">
                <span className="boxCount">{formatNumber(count)}</span>
                <span className="boxDay mtBox">AYER</span>
            </div>
            <div className="boxFooter mtBox">{txtdetail}</div>
            </div>
        </div>
    )
}
