import React from 'react'
import { formatNumber } from '../../../../helpers/calculo'

export const BoxWithPercent = ({theme="dark",count=0,percent=0,txtdetail='Personas en Total'}) => {
    return (
        <div className={`boxUI flex ${theme}`}>
            <div className="content">
                <div className="boxBody">
                    <span className="boxPercent">{percent>0 ? '+' : percent===0 ? '' : '-'} {percent}%</span>
                    <span className="boxCount mtBox">{formatNumber(count)}</span>
                    <span className="boxDay mtBox">ESTA SEMANA</span>
                </div>
                <div className="boxFooter mtBox">{txtdetail}</div>
            </div>
        </div>
    )
}
