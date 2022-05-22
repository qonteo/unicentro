import React from 'react'
import { formatNumber } from '../../../../helpers/calculo'

export const BoxDateRange = ({theme="dark",count=0,txtdetail='Personas en Total'}) => {
    return (
        <div className={`boxUI flexColumn ${theme}`}>

            <div className="rangeDate">
                <span className="boxDate">2020-12-18</span>
                <span className="boxDate">2021-02-21</span>
            </div>
            <div className="main">
                <div className="boxBody">
                    <span className="boxCount ">{formatNumber(count)}</span>
                    <span className="BoxText mtBox">TOTAL</span>
                </div>
                <div className="boxFooter mtBox">{txtdetail}</div>
            </div>

        </div>
    )
}
