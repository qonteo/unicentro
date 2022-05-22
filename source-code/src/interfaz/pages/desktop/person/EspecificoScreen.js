import React, { useEffect, useRef, useState } from 'react'
import { useButtonsReport } from '../../../../hooks/useButtonsReport'
import { useDateReport } from '../../../../hooks/useDateReport'
import { Main } from '../../../ui/layout/Main'
import { format, subDays } from 'date-fns'
import Swal from 'sweetalert2'
Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

export const EspecificoScreen = ({ location, history }) => {
    const [TipoHtmlBtn, valueTipo, setTipo] = useButtonsReport({ c: 'COMERCIAL', e: 'EJECUTIVO' })
    const [EquipoHtmlBtn, valueEquipo, setEquipo, equipoJson] = useButtonsReport({ todos: 'TODOS', CCPN001: 'TÓTEM 1', CCPN002: 'TÓTEM 2', CCPN003: 'PANISTERÍA'/* , donbuffet: 'DON BUFFET', mediterraneo: 'MEDITERRÁNEO', entrepaginas: 'ENTRE PÁGINAS' */ })
    const [PeriodoHtmlBtn, valuePeriodo, setPeriodo] = useButtonsReport({ todos: 'TODOS', d7: '07 DÍAS', d15: '15 DÍAS', d30: '30 DÍAS' })
    const [ContactoHtmlBtn, valueContacto, setContacto] = useButtonsReport({ todos: 'TODOS', cliente: 'CLIENTES', visitantes: 'VISITANTES' })
    const [GeneroHtmlBtn, valueGenero, setGenero] = useButtonsReport({ todos: 'TODOS', male: 'HOMBRES', female: 'MUJERES' })
    const [DateHtml, startDateValue, endDateValue] = useDateReport()
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

    const [isEspecific, setIsEspecific] = useState(false);


    const generar = async () => {
        let data;

        if (isEspecific) {

            if (age.all === false && age.agestart == '') {
                return Swal.fire('Error', 'El campo de inicio de edad no puedo estar vacio', 'error')
            }
            if (age.all == false && age.ageend === '' /* && inputEndAge.value==='' */) {
                return Swal.fire('Error', 'El campo de fin de edad no puedo estar vacio', 'error')
            }
            if (time.all === false && time.timestart == '') {
                return Swal.fire('Error', 'El campo de inicio de hora no puedo estar vacio', 'error')
            }
            if (time.all == false && time.timeend === '' /* && inputEndAge.value==='' */) {
                return Swal.fire('Error', 'El campo de fin de hora no puedo estar vacio', 'error')
            }

            //

            if (age.all === false && Number(age.agestart) > Number(age.ageend)) {
                return Swal.fire('Error', 'El campo de inicio de edad no puedo ser mayor a la edad de fin', 'error')
            }
            if (time.all === false && Number(time.timestart) >= 24) {
                return Swal.fire('Error', 'El formato debe de ser 24H', 'error')
            }
            if (time.all === false && Number(time.timeend) >= 24) {
                return Swal.fire('Error', 'El formato debe de ser 24H', 'error')
            }
            if (time.all === false && Number(time.timestart) >= Number(time.timeend)) {
                return Swal.fire('Error', 'El campo de inicio de hora no puedo ser mayor a la hora de fin', 'error')
            }

            let timeStart = time.timestart;
            let timeFinal = time.timeend;

            if (time.timestart.length === 1) {
                timeStart = 0 + time.timestart;


            }
            if (time.timestart.length === 1) {
                timeFinal = 0 + time.timeend;
            }
            data = {
                contact_type: valueContacto,
                report_type: valueTipo,
                resource: (equipoJson[valueEquipo]).toLowerCase(),
                gender: valueGenero === 'todos' ? 'total' : valueGenero,
                date_from: format(startDateValue, 'yyyy-MM-dd'),
                date_to: format(endDateValue, 'yyyy-MM-dd'),
                age_from: age.agestart,
                age_to: age.ageend,
                time_from: time.timestart,
                time_to: time.timeend
            }

        } else {
            if (valuePeriodo === 'todos') {

                data = {
                    report_type: valueTipo,
                    resource: valueEquipo,
                    date_from: '2020-12-02',
                    date_to: format(new Date(), 'yyyy-MM-dd'),
                    time_from: '2020-12-02%00:00',
                    time_to: `${format(new Date(), 'yyyy-MM-dd')}%00:00`,
                    gender: 'total'
                }
            } else {
                const newDate = subDays(new Date(), Number(valuePeriodo.replace('d', '')));

                data = {
                    report_type: valueTipo,
                    resource: (equipoJson[valueEquipo]).toLowerCase(),
                    date_from: format(newDate, 'yyyy-MM-dd'),
                    date_to: format(new Date(), 'yyyy-MM-dd'),
                    time_from: `${format(newDate, 'yyyy-MM-dd')}%00:00`,
                    time_to: `${format(new Date(), 'yyyy-MM-dd')}%00:00`,
                    gender: 'total'
                }
            }
        }

        const dataFilter = Object.filter(data, reporte => reporte !== 'todos' && reporte !== '');
        if (valueTipo === 'c') {
            return history.push('/reportes-screen/comercial', dataFilter);
        }
        history.push('/reportes-screen/ejecutivo', dataFilter);
    }

    const resetEspecifico = () => {
        setContacto('todos')
        setGenero('todos')

        setAge({
            all: true,
            ageend: '',
            agestart: ''
        })
        setTime({
            all: true,
            timestart: '',
            timeend: ''
        })
        setIsEspecific(!isEspecific);
        /*   if (!!document.getElementById('contentEspec')) {
              inputStartTime.current.value = ''
              inputEndTime.current.value = ''
              inputStartAge.current.value = ''
              inputEndAge.current.value = ''
  
          } */
    }

    const setRange = (value, type) => {
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
    }


    useEffect(() => {
        (() => {
            const btn = document.querySelector('#sec_genero');
            if (isEspecific) {
                if (valueEquipo === 'CCPN003') {
                    setGenero('todos')
                    setTimeout(() => {
                        btn.querySelector('.groupButtons button:nth-child(2)').classList.add('hide')
                        btn.querySelector('.groupButtons button:nth-child(3)').classList.add('hide')
                    }, 10);
                    /* 
                    btn.querySelector('.groupButtons button:nth-child(2)').classList.add('hide')
                    btn.querySelector('.groupButtons button:nth-child(3)').classList.add('hide')
                     */
                } else {
                    console.log('no dio en el sensor no se ocultara los botones')
                }
            }
        })()
    }, [isEspecific,valueEquipo,valueTipo])

    return (
        <Main>
            <h3 className="subTitle spaceXY">GENERA TU REPORTE</h3>
            <h3 className="subTitle color-secundary">REPORTE GENERAL</h3>
            <div className="d-grid-report spaceTop content-btntext">
                <p className="text-report">Seleccione tipo de<br /> reporte:</p>
                <TipoHtmlBtn />
            </div>
            <div className="d-grid-report  content-btntext">
                <p className="text-report">Seleccione equipo:</p>
                <EquipoHtmlBtn />
            </div>
            {!isEspecific &&
                <div className="d-grid-report  content-btntext">
                    <p className="text-report">Seleccione Periodo:</p>
                    <PeriodoHtmlBtn />
                </div>
            }


            <div className="groupButtons text-center spaceTop">

                <button onClick={resetEspecifico} className={`filterBtn`}>ESPECIFICO</button>
                {!isEspecific && <button onClick={generar} className={`filterBtn`}>GENERAR</button>
                }
            </div>

            {/*  */}

            {isEspecific &&
                <div id="contentEspec">
                    <h3 className="subTitle color-secundary spaceXY">REPORTE ESPECIFICO</h3>
                    {/*  <div className="d-grid-report  content-btntext">
                        <p className="text-report">Seleccione tipo de<br /> Contacto:</p>
                        <ContactoHtmlBtn />
                    </div> */}
                    <div className="d-grid-report  content-btntext" id="sec_genero">
                        <p className="text-report">Seleccione Género:</p>
                        <GeneroHtmlBtn />
                    </div>
                    <div className="d-grid-report  content-btntext">
                        <p className="text-report">Seleccione una Fecha:</p>
                        <DateHtml />
                    </div>
                    {/*   <div className="d-grid-report  content-btntext ">
                        <p className="text-report">Seleccione una Edad:</p>
                        <div className="groupButtons report">
                            <button onClick={() => setAge({ all: true, agestart: '', ageend: '' })} className={`filterBtn ${age.all ? 'active' : ''}`}>TODOS</button>
                            <select onChange={({ target }) => setRange(target.value, 'age')} className="filterBtn">
                                <option value="-18,24">-18 a 24</option>
                                <option value="24,30">24 a 30</option>
                                <option value="30,36">30 a 36</option>
                                <option value="36,42">36 a 42</option>
                                <option value="42,48">42 a 48</option>
                                <option value="54,60">54 a 60+</option>
                            </select>
                            <input min="1" ref={inputStartAge} name="agestart" onChange={({ target }) => setAge({ ...age, [target.name]: target.value, all: false })} className="filterBtn" type="number" />
                            <input min="1" ref={inputEndAge} name="ageend" onChange={({ target }) => setAge({ ...age, [target.name]: target.value, all: false })} className="filterBtn" type="number" />
                        </div>
                    </div> */}
                    {/*   <div className="d-grid-report spaceBottom content-btntext ">
                        <p className="text-report">Seleccione una Hora:</p>
                        <div className="groupButtons report">
                            <button onClick={() => setTime({ all: true, timeend: '', timestart: '' })} className={`filterBtn ${time.all ? 'active' : ''}`}>TODOS</button>
                            <select onChange={({ target }) => setRange(target.value, 'time')} className="filterBtn">
                                <option value="0,4">0h a 4h</option>
                                <option value="4,8">4h a 8h</option>
                                <option value="12,16">12h a 16h</option>
                                <option value="20,24">20h a 24h</option>
                            </select>
                            <input min="1" ref={inputStartTime} name="timestart" onChange={({ target }) => setTime({ ...time, [target.name]: target.value, all: false })} className="filterBtn" type="number" />
                            <input min="1" ref={inputEndTime} name="timeend" onChange={({ target }) => setTime({ ...time, [target.name]: target.value, all: false })} className="filterBtn" type="number" />
                        </div>
                    </div> */}

                    {isEspecific &&
                        <div className="spaceBottomSmall text-center">
                            <button onClick={generar} className={`filterBtn  `}>GENERAR</button>
                        </div>
                    }
                </div>

            }

        </Main>
    )
}
