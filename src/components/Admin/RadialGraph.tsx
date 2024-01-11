import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface RadialGraphProps {
    data: number[];
}

const RadialGraph: React.FC<RadialGraphProps> = ({ data }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (data.length) {
            drawRadialGraph();
        }
    }, [data]);

    const svg = d3.select(ref.current);
    const width = 300;
    const height = 300;

    const drawRadialGraph = () => {
        const radius = Math.min(width, height) / 2;

        const total = d3.sum(data); // Suma total de los datos
        let runningTotal = 0; // Acumulador para calcular el ángulo de inicio

        const angleScale = d3.scaleLinear()
            .domain([0, total])
            .range([0, 2 * Math.PI]);

        const colorArray = ['var(--ion-color-primary)', 'var(--ion-color-secondary)', 'var(--ion-color-tertiary)'];

        // Acceder a las variables CSS para los colores
        const computedStyle = getComputedStyle(document.documentElement);
        const colorScale = (index: number) => {
            return colorArray[index];
        };

        svg.selectAll("*").remove();

        const group = svg.append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

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

    return <svg ref={ref} width={width} height={height}></svg>;
};

export default RadialGraph;
