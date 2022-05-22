import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { SideBar } from './SideBar'

export const Main = React.memo(({children,isSidebar=true}) => {
    return (
        <div className="mainScreens">
            {isSidebar && 
            <div className="contentSidebar">
            <SideBar />
            </div>
            }
            
            <div className={`contentScreens ${!isSidebar && 'm-0'}`}  >
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    )
})
