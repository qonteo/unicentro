import React, { useEffect, useRef } from 'react'
import { HorizontalBar } from 'react-chartjs-2';

export const GraficCompare = React.memo(({ data = [], id = '' }) => {

    return (
        <>
            {data.length === 0 ?
                <div className="__loader_grafic" >
                    <img src="/assets/load/qonteo.gif" alt="spinner_loaded" />
                </div> :
                (
                    <div className="flex-center"   >
                        <div id={id} className={`contenedorChart  classtest`}>
                            <HorizontalBar data={
                                {
                                    labels: data.map(a => a.label),
                                    datasets: [

                                        {
                                            label: 'Hombres',
                                            backgroundColor: '#0502D3',

                                            data: data.map(a => a.x)
                                        },
                                        {
                                            label: 'Mujeres',
                                            backgroundColor: '#1EAEF0',
                                            data: data.map(a => -1 * a.y)
                                        }
                                    ]
                                }

                            }
                                options={{
                                    cornerRadius: 20,
                                    title: {
                                        display: true,
                                        /*    text: ['TOTAL ACUMULADO PERSONAS POR GÉNERO', '', ''], */
                                        fontSize: 30,
                                        padding: 30,
                                        fontColor: '#454545',
                                        fontFamily: 'Barlow',
                                        fontStyle: 400
                                    },
                                    maintainAspectRatio: false,
                                    legend: {
                                        position: 'bottom',
                                        labels: {
                                            padding: 20,
                                            boxWidth: 15,
                                            fontFamily: 'system-ui',
                                            fontColor: 'black'
                                        },
                                        reverse: true
                                    },



                                    tooltips: {
                                        titleFontSize: 20,
                                        xPadding: 20,
                                        yPadding: 20,
                                        bodyFontSize: 15,
                                        bodySpacing: 10,
                                        callbacks: {
                                            title: function (tooltipItem, data) {
                                                return "Edad:  " + data.labels[tooltipItem[0].index] + ' años';
                                            },
                                            label: function (tooltipItem, data) {
                                                var value = Math.sign(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]) === -1 ? data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * -1 : data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]


                                                return data.datasets[tooltipItem.datasetIndex].label + ': ' + value;


                                            }
                                        }
                                    },
                                    elements: {
                                        line: {
                                            borderWidth: 8,
                                            fill: false
                                        },

                                    },

                                    scales: {
                                        xAxes: [
                                            {
                                                stacked: false,
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                                gridLines: {
                                                    display: false
                                                }
                                            },

                                        ],
                                        yAxes: [
                                            {
                                                stacked: true,
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                                gridLines: {
                                                    display: false
                                                },
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: "Edad",
                                                    fontSize: 18,

                                                },
                                                position: "left",
                                            }
                                        ],
                                    }

                                }}
                            />
                        </div>
                    </div>
                )
            }
        </>

    )
})
