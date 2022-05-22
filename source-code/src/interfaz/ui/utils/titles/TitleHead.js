import React from 'react'

export const TitleHead =React.memo((props) => {
    return (
        <h2 className="titleHead" >{props.children}</h2>
    )
})
