import React, { useState } from 'react'

export const useForm = (campos) => {
    const [fields, setFields] = useState(campos);
    const changeValueInput=({target})=>{
        setFields({
            ...fields,
            [target.name]:target.value
        })
    }



    return [fields,changeValueInput]
}
