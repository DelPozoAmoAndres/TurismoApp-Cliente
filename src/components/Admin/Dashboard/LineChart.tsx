import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface AreaProps {
    day: number;
    occupationRatio: number;
}

interface LineChartProps {
    data: AreaProps[];
    height: number;
    width: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, height, width }) => {
    const ref = useRef<SVGSVGElement>(null);
    const margin = { top: 10, right: 30, bottom: 0, left: 0 };
    const widthPref = (width != undefined ? width : 960) - margin.left - margin.right;
    const heightPref = (height != undefined ? height : 500) - margin.top - margin.bottom;

    useEffect(() => {
        if (data) {
            drawLineChart();
        }
        //eslint-disable-next-line
    }, [data]);



    const drawLineChart = () => {

        // Escalas para los ejes X e Y
        const x = d3.scaleTime().range([0, widthPref]).domain(d3.extent(data, d => d.day) as [number, number]);
        const y = d3.scaleLinear().range([heightPref, 0]).domain([0, d3.max(data, d => d.occupationRatio) as number]);

        // Generador del gráfico de área
        const area = d3.area<AreaProps>()
            .x(d => x(d.day))
            .y0(heightPref)
            .y1(d => y(d.occupationRatio));

        // Generador del gráfico de línea
        const line = d3.line<AreaProps>()
            .x(d => x(d.day))
            .y(d => y(d.occupationRatio));

        // Crear el SVG
        const svg = d3.select(ref.current);


        // Limpia cualquier gráfico previo
        svg.selectAll("*").remove();
        
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        // // Crear grupo para leyenda
        // const legend = g.append("g")
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", 10)
        //     .attr("text-anchor", "end")
        //     .selectAll("g")
        //     .data([0, 25, 50, 75, 100].reverse()) // Reverse para que 100 esté en la parte superior si así lo deseas
        //     .enter().append("g")
        //     .attr("transform", (d, i) => `translate(50,${i * 17.5})`);

        // // Añadir rectángulos de colores a la leyenda
        // legend.append("rect")
        //     .attr("x", widthPref - 19)
        //     .attr("width", 19)
        //     .attr("fill", () => "red"); // Asegúrate de definir colorScale

        // // Añadir texto a la leyenda
        // legend.append("text")
        //     .attr("x", widthPref - 24)
        //     .attr("y", 0)
        //     .attr("dy", "0.37em")
        //     .text(d => d);

        // const values = [0, 25, 50, 75, 100];
        // values.forEach(value => {
        //     g.append('rect')
        //         .attr('x', 0)
        //         .attr('y', y(value))
        //         .attr('width', widthPref)
        //         .attr('height', 1)
        //         .attr('fill', 'transparent')
        //         .attr('stroke', 'var(--ion-color-tertiary)');
        // });

        // Área
        g.append('path')
            .datum(data)
            .attr('fill', 'var(--ion-color-secondary)')
            .attr('d', area);

        // Línea
        g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'var(--ion-color-primary)')
            .attr('stroke-width', 1.5)
            .attr('d', line);


    }

    return <svg preserveAspectRatio="xMidYMid meet"  ref={ref} width={widthPref + margin.left + margin.right} height={heightPref + margin.top + margin.bottom}></svg>;
};
