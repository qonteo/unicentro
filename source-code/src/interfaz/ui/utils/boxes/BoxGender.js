import React from 'react'
import { formatNumber, porcentajepersona } from '../../../../helpers/calculo'

export const BoxGender = ({gender,theme='dark',total=0,count=0}) => {
    return (
        <div className={`boxUI flex gender ${theme}`}>
        <div >
            <div className="boxBody">
                {gender==='male' 
                    ?
                    <img className="icongender" src={theme==='dark' ? '/assets/icons/male-white.svg' : '/assets/icons/male-dark.svg' } />
                    :
                    <img className="icongender" src={theme==='dark' ? '/assets/icons/female-white.svg' : '/assets/icons/female-dark.svg' } />
                }
                <span className="count boxCountGender">{formatNumber(count)}</span>
                <span className=" mtBox">{gender==='male' ? 'HOMBRES' : 'MUJERES'}</span>
            </div>
            <div className="boxFooter mtBox"><span className="boxPercent">{porcentajepersona(total,count)} %</span></div>
        </div>
    </div>
    )
}
