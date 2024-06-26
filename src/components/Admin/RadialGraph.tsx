import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RadialGraphProps {
    values: {category:string,reservationsRate:number}[];
}

const RadialGraph: React.FC<RadialGraphProps> = ({ values }) => {
    const ref = useRef<SVGSVGElement>(null);
    const legend = useRef<SVGSVGElement>(null);

    const data = values.map((value) => value.reservationsRate);

    useEffect(() => {
        if (data.length) {
            drawRadialGraph();
        }
        // eslint-disable-next-line
    }, [data]);

    const svg = d3.select(ref.current);
    const width = 300;
    const height = 295;

    const svgLegend = d3.select(legend.current);

    const drawRadialGraph = () => {
        const radius = Math.min(width, height) / 2;

        const total = d3.sum(data); // Suma total de los datos
        let runningTotal = 0; // Acumulador para calcular el ángulo de inicio

        const angleScale = d3.scaleLinear()
            .domain([0, total])
            .range([0, 2 * Math.PI]);

        const colorArray = [
            'var(--ion-color-primary)', 
            'var(--ion-color-secondary)', 
            'var(--ion-color-tertiary)',
            '#046960',
            '#04867A',
            '#022D30',
            '#369687',
            '#0B3B3F',
            '#6AAFAE',
            '#033D41',
            '#2C787A',
            '#123D40',
            '#5C9A9D',
        ];

        const colorScale = (index: number) => {
            return colorArray[index];
        };

        svg.selectAll("*").remove();

        const group = svg.append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const legend = svgLegend.append("g")
            .selectAll(".legend")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(0, ${i * 20})`);

        legend.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", (d, i) => colorScale(i))

        legend.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .text((d, i) => values[i].category);

        // const arc = d3.arc()
        //     .innerRadius(0)
        //     .outerRadius(radius);

        group.selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("d", (d: number) => {
                const startAngle = angleScale(runningTotal);
                runningTotal += d; // Actualiza el acumulador
                const endAngle = angleScale(runningTotal);

                return d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)
                    .startAngle(startAngle)
                    .endAngle(endAngle)(d as unknown as d3.DefaultArcObject);
            })
            .attr("fill", (d, i) => colorScale(i)); // Asigna un color a cada segmento
    };

    return <div style={{minWidth:"425px"}}>
            <svg ref={legend} width={125} height={"100%"}></svg>
            <svg  preserveAspectRatio="xMidYMid meet" 
                ref={ref} width={width} height={height}>
            </svg>
        </div>;
};

export default RadialGraph;
