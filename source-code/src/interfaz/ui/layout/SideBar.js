import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom';
import { checkingFinish, logout } from '../../../action/auth';
export const SideBar = React.memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const openContent = useRef(null);
    const openClose = () => {

        openContent.current.parentNode.classList.toggle('open');
        document.querySelector('.contentScreens').classList.toggle('open')
        setIsOpen(!isOpen);
    }

    const closeSession = () => {
        localStorage.clear();
        dispatch(logout());
    }

    return (
        <>
            <div ref={openContent} className="iconCloseOpen" onClick={openClose}>
                <img src={`${isOpen ? '/assets/icons/close.svg' : '/assets/icons/closeopen.svg'} `} alt="iconClose" />
            </div>
            <div className="icons">
                <div>
                    <NavLink exact to="/" activeClassName="activeIcon" className="icon">
                        <img src="/assets/icons/home.svg" alt="iconHome" />

                        <span className="titleIcon">Home</span>

                    </NavLink>
                    <NavLink exact to="/" activeClassName="activeIcon" className="icon">
                        <span className="nameIcon">Oportunidades</span>

                        <img src="/assets/icons/person.svg" alt="iconPerson" />
                        <span className="titleIcon">Personas</span>

                    </NavLink>
                    <div className="icon-two">
                        <span className="nameIcon">Reportes</span>
                        <div className={`icon ${location.pathname.includes('especifico') ? 'activeIcon' : ''}`}>
                            <NavLink exact to="/reportes/especifico" >
                                <img src="/assets/icons/report.svg" className="w-4 l-2" alt="iconPerson" />
                                <span className="titleIcon">Especifico</span>
                            </NavLink>

                        </div>                    

                    </div>

                   {/*  <div className="icon__submenu">
                        <ul>
                            <li>Panisteria</li>
                        </ul>
                    </div> */}
                </div>

                <div className="pweroff">
                    <img onClick={closeSession} src="/assets/icons/closesession.svg" alt="iconPerson" />
                </div>


            </div>
        </>
    )
})
