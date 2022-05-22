import React, { useState } from 'react'

/**
 * @module Hooks
 */

/**
 * 
 * @param {Object} buttons Objecto con los botonnes a generar
 * @returns {Object} 
 */

const useButtonsReport = (buttons={}) => {
    const [sectionValue, setSectionValue] = useState(Object.keys(buttons)[0]);
    const ButtonsHtml=()=>(
        <div  className="groupButtons text-center spaceBottom">
            {Object.keys(buttons).map((v,_i)=>(
                  <button  key={_i} onClick={({target})=>setSectionValue(v)} className={`filterBtn ${v===sectionValue  ? 'active' : ''}`}>{buttons[v]}</button>
            ))}
        </div>
        
    )

    return [ButtonsHtml,sectionValue,setSectionValue,buttons];
}

export {useButtonsReport}