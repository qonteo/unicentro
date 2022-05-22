import React from 'react'
import { formatNumber } from '../../../../helpers/calculo'

export const BoxDate = ({theme="dark",count=0,percent=0,txtdetail='Personas en Total'}) => {
    return (
        <div className={`boxUI flexColumn ${theme}`}>
            <span className="boxDate">2021-02-21</span>
            <div className="main">
                <div className="boxBody date">
                    <span className="boxPercent">{percent>0 ? '+' : percent===0 ? '' : '-'} {percent}%</span>
                    <span className="boxCount">{formatNumber(count)}</span>
                    <span className="boxDay">HOY</span>
                </div>
                <div className="boxFooter mtBox">{txtdetail}</div>
            </div>
        </div>
    )
}
