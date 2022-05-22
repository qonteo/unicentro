import React, { useEffect, useState, useRef } from 'react'
import { useButtonsReport } from '../../../../hooks/useButtonsReport'
import { Main } from '../../../ui/layout/Main'
import data from '../../../../data/sensor.json'
import { useDispatch, useSelector } from 'react-redux'
import { getTrazabilidad, setTrazabilidadByHour } from '../../../../action/trazabilidad'

const maxHour = 24;
export const TrazibilidadScreen = ({ location }) => {
    const dispatch = useDispatch()
    const [graphicsData, setGraphicsData] = useState([]);
    const { resources, hours } = useSelector(state => state.trazabilidad);
    const [EquipoHtmlBtn, valueEquipo, setEquipo, equipoJson] = useButtonsReport({ todos: 'TODOS', CCPN001: 'TÓTEM 1', CCPN002: 'TÓTEM 2', CCPN003: 'PANISTERÍA'/* , donbuffet: 'DON BUFFET', mediterraneo: 'MEDITERRÁNEO', entrepaginas: 'ENTRE PÁGINAS' */ })
    const [ContactoHtmlBtn, valueContacto, setContacto] = useButtonsReport({ todos: 'TODOS', cliente: 'CLIENTES', visitantes: 'VISITANTES' })
    const [PeriodoHtmlBtn, valuePeriodo, setPeriodo] = useButtonsReport({ todos: 'TODOS', d7: '07 DÍAS', d15: '15 DÍAS', d30: '30 DÍAS' })
    const [GeneroHtmlBtn, valueGenero, setGenero] = useButtonsReport({ total: 'TODOS', male: 'HOMBRES', female: 'MUJERES' })
    const [isPlay, setIsPlay] = useState(true);
    const [timeOut, setTimeOut] = useState(null)
    const [age, setAge] = useState({
        agestart: '',
        ageend: '',
        all: true
    })
    const inputStartAge = useRef(null)
    const inputEndAge = useRef(null)
    const [time, setTime] = useState({
        timestart: '',
        timeend: '',
        all: true
    })
    const inputStartTime = useRef(null)
    const inputEndTime = useRef(null)
    const [countHours, setCountHours] = useState([]);

    const [counter, setCounter] = useState(0)

    const [numberHour, setNumberHour] = useState('');
    const draw = (data, value = 'total') => {
        let dataf;
        dataf=data.filter(d=>d.name===valueEquipo);
        if(dataf.length===0){
            dataf=data;
        }
        const canvas = document.getElementById('monitoreoComercio');
        const ctx = canvas.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dataf.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.ratio+40, 0, 2 * Math.PI, false);
            ctx.fillStyle = c.color;
            ctx.fill();
            ctx.font = "13px Arial";
            ctx.fillStyle = "#FFF";
            ctx.fillText(c[valueGenero], c.labelX, c.labelY);
        })
    }

    useEffect(() => {
        (() => {
            /*             setGraphicsData(resources); */
            dispatch(getTrazabilidad())
        })()
    }, [])
    useEffect(() => {
        const countHrs = new Array(24).fill(0).map((_, i) => i);
        setCountHours(countHrs);
    }, [])


    useEffect(() => {
        const twodBtn=document.querySelector('#sec_genero .groupButtons button:nth-child(2)');
        const threetBtn=document.querySelector('#sec_genero .groupButtons button:nth-child(3)');
        if(valueEquipo==='CCPN003'){
            setGenero('total')
            twodBtn.classList.add('hide');
            threetBtn.classList.add('hide');
        }else{
            twodBtn.classList.remove('hide');
            threetBtn.classList.remove('hide');
        }
        draw(resources, valueGenero);
    }, [resources, , valueGenero,valueEquipo])
    const newHour = (hour) => {
        const dataHourFilter = hours.filter(h => h.hour === hour);

        dispatch(setTrazabilidadByHour(dataHourFilter[0].resources))

    }

    /*  const setRange = (value, type) => {
         const valueCount = value.split(',');
         if (type === 'time') {
             inputStartTime.current.value = ''
             inputEndTime.current.value = ''
             setTime({
                 all: false,
                 timestart: valueCount[0],
                 timeend: valueCount[1]
             })
         } else {
             inputStartAge.current.value = ''
             inputEndAge.current.value = ''
             setAge({
                 all: false,
                 agestart: valueCount[0],
                 ageend: valueCount[1]
             })
         }
     } */

    const isPlayButton = () => {
        setIsPlay(!isPlay)

    }
    const resetTimer = () => {
        startCounter(maxHour);
        setNumberHour('');
        setCounter(0);
        setIsPlay(true);
        dispatch(getTrazabilidad())
        /* 
                setGraphicsData(data.sensores); */

    }
    const setHour = (num) => {
        setNumberHour(num);
        setCounter(num);
        setIsPlay(true);
        const dataHourFilter = hours.filter(h => h.hour === num);

        dispatch(setTrazabilidadByHour(dataHourFilter[0].resources))
    }

    const startCounter = (number) => {
        if (!isPlay) {
            clearTimeout(timeOut)
            return false;
        }
        if (number >= maxHour) {
            setCounter(0);
            setIsPlay(true)
            setIsPlay(true)
            clearTimeout(timeOut)
            return false;
        }

        let interval = setTimeout(() => {
            setNumberHour(n => number)
            newHour(number);
            setCounter(n => number + 1)
            startCounter(number + 1);
        }, 1000);
        setTimeOut(interval)

    }

    return (
        <Main>
            <h3 className="subTitle spaceTop">TRAZABILIDAD DE USUARIOS EN COMERCIO</h3>
            <div className="d-grid-report  content-btntext spaceTop">
                <p className="text-report">Seleccione equipo:</p>
                <EquipoHtmlBtn />
            </div>
            {/* <div className="d-grid-report  content-btntext">
                <p className="text-report">Seleccione tipo de<br /> Contacto:</p>
                <ContactoHtmlBtn />
            </div> */}
            <div className="d-grid-report  content-btntext" id="sec_genero">
                <p className="text-report">Seleccione Género:</p>
                <GeneroHtmlBtn />
            </div>
            {/*  <div className="d-grid-report  content-btntext ">
                <p className="text-report">Seleccione una Edad:</p>
                <div className="groupButtons report">
                    <button onClick={() => setAge({ all: true, agestart: '', ageend: '' })} className={`filterBtn ${age.all ? 'active' : ''}`}>TODOS</button>
                    <select onChange={({ target }) => setRange(target.value, 'age')} className="filterBtn">
                        <option value="" hidden>EDAD ESPECIFICA</option>
                        <option value="-18,24">-18 a 24</option>
                        <option value="24,30">24 a 30</option>
                        <option value="30,36">30 a 36</option>
                        <option value="36,42">36 a 42</option>
                        <option value="42,48">42 a 48</option>
                        <option value="54,60">54 a 60+</option>
                    </select>
                    <input min="1" placeholder="INGRESE EDAD DE INICIO" ref={inputStartAge} name="agestart" onChange={({ target }) => setAge({ ...age, [target.name]: target.value, all: false })} className="filterBtn" type="number" />
                    <input min="1" placeholder="INGRESE EDAD DE FIN" ref={inputEndAge} name="ageend" onChange={({ target }) => setAge({ ...age, [target.name]: target.value, all: false })} className="filterBtn" type="number" />
                </div>
            </div> */}
            {/*  <div className="d-grid-report  content-btntext">
                <p className="text-report">Seleccione Periodo:</p>
                <PeriodoHtmlBtn />
            </div> */}
            {/* <div className="d-grid-report  content-btntext ">
                <p className="text-report">Seleccione una Hora:</p>
                <div className="groupButtons report">
                    <button onClick={() => setTime({ all: true, timeend: '', timestart: '' })} className={`filterBtn ${time.all ? 'active' : ''}`}>TODOS</button>
                    <select onChange={({ target }) => setRange(target.value, 'time')} className="filterBtn">
                        <option value="" hidden>SELECCIONE RANGO DE HORA</option>
                        <option value="0,4">0h a 4h</option>
                        <option value="4,8">4h a 8h</option>
                        <option value="12,16">12h a 16h</option>
                        <option value="20,24">20h a 24h</option>
                    </select>
                    <input min="1" placeholder="INGRESE HORA DE INICIO" ref={inputStartTime} name="timestart" onChange={({ target }) => setTime({ ...time, [target.name]: target.value, all: false })} className="filterBtn" type="number" />
                    <input min="1" placeholder="INGRESE HORA DE FIN" ref={inputEndTime} name="timeend" onChange={({ target }) => setTime({ ...time, [target.name]: target.value, all: false })} className="filterBtn" type="number" />
                </div>
            </div> */}
            <div className="d-grid-report spaceTopSmall  content-btntext">
                <p className="text-report"></p>
                <button className={`filterBtn w-fit `} onClick={resetTimer}>TODAS LAS HORAS</button>
            </div>
            <div className="d-grid-report spaceTopSmall  content-btntext">
                <p className="text-report"></p>
                <div className="listhour">
                    {countHours.map((h, index) => (
                        <span key={h} onClick={() => setHour(h)} className={`listhour__item ${Number(h) === numberHour ? 'active' : ''}`}>{h}</span>
                    ))}
                </div>
            </div>
            <div className="contentcanvas spaceTop">
                <canvas style={{ backgroundImage: `url(/assets/images/planoflujo.jpg)` }} className="mt" id="monitoreoComercio" width="1024" height="556"></canvas>
                <div className="contencanvas__play">
                    <img className="contencanvas__btn" onClick={() => { startCounter(counter); isPlayButton() }} src='/assets/icons/play.svg' alt="imgButton" />
                </div>
            </div>
        </Main>
    )
}
