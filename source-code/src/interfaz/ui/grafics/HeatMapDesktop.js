import React, { useRef, useEffect, memo } from 'react'
import * as d3 from 'd3'
import moment from 'moment'
export const HeatMapDesktop = memo(({ data, range }) => {

    const ref = useRef()

    useEffect(() => {
        tablehours(data)

        return () => {
            validarref()
        }
    }, [data])

    useEffect(() => {
        (()=>{
           let timeOut= setTimeout(() => {
                if(data.length===0){
                    if(!!document.querySelector('.heatmaploading')){
                        document.querySelector('.heatmaploading').parentElement.parentElement.removeChild(document.querySelector('.heatmaploading').parentElement);
                    }
                }
            }, 5000);
            return ()=>{
                clearTimeout(timeOut)
            }
        })()
    }, [])

    const validarref = () => {
        if (!!ref.current) {
            ref.current.querySelector('svg') !== null && ref.current.querySelector('svg').remove()
        }
    }

    const tablehours = (data) => {

        const dias_semana = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
       
    
        
        if (data.length > 0) {
          
    
           
            const margin = { top: 30, right: 200, bottom: 200, left: 50 },
                width = 900 - margin.left - margin.right,
                height = 950 - margin.top - margin.bottom;


            const svg = d3.select(ref.current)
                .attr("align", "center")

                .append("svg")
                .attr("width", 700)
                .attr("height", 750)
                .append("g")

                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");



            const myVars = ["23:00h", "22:00h", "21:00h", "20:00h", "19:00h", "18:00h", "17:00h", "16:00h", "15:00h", "14:00h", "13:00h", "12:00h", "11:00h", "10:00h", "9:00h", "8:00h", "7:00h", "6:00h", "5:00h", "4:00h", "3:00h", "2:00h", "1:00h", "0:00h"];

            const x = d3.scaleBand()
                .range([0, width])
                .domain(dias_semana)
                .padding(0.01);
            svg.append("g")
                .attr("transform", "translate(0, 0)")
                .call(d3.axisTop(x))


            // Build X scales and axis:
            const y = d3.scaleBand()
                .range([height, 0])
                .domain(myVars)
                .padding(0.01);
            svg.append("g")
                .call(d3.axisLeft(y));
                
            const range = data.map(r => r.y)
            // Build color scale
            const myColor = d3.scaleQuantile()
                .range(['#5BCDFA', '#5EAFFE', '#4782F5', '#3450EF', '#0502D3'])
                //										  .range(["#63be7b", "#f8696b"])
                .domain(range)
            const rectContainer = svg.selectAll()
                .data(data, function (d) {  return d.x + ':' + d.label; })
                .enter().append("g")
                .attr("transform", function (d) {
                    
                    return "translate(" + (x(d.x)) + "," + (y(d.label)) + ")"
                });

            /* svg.append("text")
                .attr("x", 525)
                .attr("y", 720)
                .attr("text-anchor", "left")
                .style("font-size", "30px")
                .style("font-family", "Barlow")
                .text("Total"); */

            rectContainer.append("rect")
                .attr("width", x.bandwidth())
                .attr("height", y.bandwidth())
                .style("fill", function (d) { return myColor(d.y) })

            rectContainer.append("text")
            .attr("x", (x.bandwidth()) / 2)
            .attr("y", ((y.bandwidth()) / 2) + 4)
            .text(function (d) { return d.y })
            .style("font-family", "Barlow")
            .style("font-size", "8pt")
            .style('fill', 'white')
            .style("text-anchor", "middle")

        }



    }
    return (
        <>
            {data.length === 0 ?
                <div className="__loader_grafic heatmaploading">
                    <img src="/assets/load/qonteo.gif" alt="spinner_loaded" />
                </div> :
                (
                    <>
                        <div className="rangeHeatMap">
                            {range.map(({ x},_i) => (
                                <div className="range" key={_i}>
                                    <span  >{x}</span>
                                    <div className="bgColorHeatMap"></div>
                                </div>

                            ))}
                        </div>
                        <div className="mtxl text-center"
                            ref={ref}
                        ></div>
                    </>

                )
            }

        </>
    )
}
)