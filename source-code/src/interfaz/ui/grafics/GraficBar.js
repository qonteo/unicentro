import React from 'react'
import { Bar } from 'react-chartjs-2'
export const GraficBar = React.memo(({ data = [], label, dtsetbg, optionbg, scalebg, title, labelop, legendbg = 'black', scltxtlbl = false, pl = 0, pr = 0, pb = 0, pt = 0, theme = 'ligth', id = '' }) => {
    return (
        <>
            {data.length === 0 ?
                <div className="__loader_grafic">
                    <img src="/assets/load/qonteo.gif" alt="spinner_loaded" />
                </div> :
                (
                    <div className="flex-center" >
                        <div id={id} className={`contenedorChart  ${theme} classtest`}>
                            <Bar data={

                                {

                                    labels: data.map(a => a.x),
                                    datasets: [
                                        {
                                            label: `${label}`,

                                            backgroundColor: `${dtsetbg}`,
                                            data: data.map(a => a.y),
                                            borderWidth: 0
                                        },

                                    ],
                                    borderWidth: 0
                                }

                            }
                                options={{

                                    cornerRadius: 20,
                                    title: {
                                        display: true,

                                        fontSize: 30,
                                        fontColor: `${optionbg}`,
                                        fontFamily: 'Barlow',
                                        fontStyle: 400,
                                    },
                                    layout: {
                                        padding: {
                                            left: pl,
                                            right: pr,
                                            top: pt,
                                            bottom: pb
                                        },
                                    },
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            padding: 20,
                                            boxWidth: 15,
                                            fontSize: 18,
                                            fontFamily: 'Barlow',
                                            fontColor: `${legendbg}`
                                        }
                                    },
                                    tooltips: {
                                        enabled: true,
                                        mode: 'single',
                                        callbacks: {
                                            title: function (tooltipItem, datax) {

                                                return `${title}` + data[tooltipItem[0].index].label;
                                            },
                                            label: function (tooltipItems, data) {
                                                return `${labelop}` + tooltipItems.yLabel;
                                            },
                                        }
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                fontColor: `${scalebg}`,
                                                fontSize: 18,
                                                fontFamily: 'Barlow',
                                                fontStyle: 600,
                                                beginAtZero: true,

                                            },
                                            gridLines: {
                                                display: false
                                            }
                                            ,
                                            scaleLabel: {
                                                display: false,
                                                labelString: `${scltxtlbl}`,
                                                fontSize: 18,

                                            }

                                        }],
                                        xAxes: [{
                                            ticks: {
                                                fontColor: `${scalebg}`,
                                                fontSize: 18,
                                                fontFamily: 'Barlow',
                                                fontStyle: 600,

                                                beginAtZero: true
                                            },
                                            gridLines: {
                                                display: false
                                            }
                                        }]
                                    },
                                }}
                            />
                        </div>
                    </div>

                )
            }
        </>
    )
})
