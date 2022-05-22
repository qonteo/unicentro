import React from 'react'

export const Header = React.memo(({ children }) => {
  
    return (
        <>
            <div className="headerTop d-flex auth">
                <img className="imgSmall" src="/assets/images/header/onlysoda.png" alt="logosoda" />
                <h1 className="titleHeadAuth">
                    data <br/>
                    street <br/>
                    performance
                </h1>
            </div>
            <div className="w-100 text-center logoMiddle">
            <img  src="/assets/images/header/soda.png" />
            <div className="groupIcons mtMedium">
                <img src="/assets/icons/camara.svg"/>
                <img src="/assets/icons/auto.svg"/>
                <img src="/assets/icons/person-inspect.svg"/>
            </div>
            </div>
            {children}
        </>
    )
})
