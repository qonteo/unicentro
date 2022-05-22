import React from 'react'

export const Header = React.memo(() => {
    return (
        <div className="headerTop grid3">
            <img src="/assets/images/header/logosoda.png" alt="logosoda"/>
            <img src="/assets/images/header/soda.png" alt="logo"/>
          <div className="iconNotify">
          <img src="/assets/icons/notify.svg" alt="notify"/>
          </div>
            
        </div>
    )
})
