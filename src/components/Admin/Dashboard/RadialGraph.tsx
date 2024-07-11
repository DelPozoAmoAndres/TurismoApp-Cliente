import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@hooks/useLanguage';

interface RadialGraphProps {
    values: { category: string, reservationsRate: number }[];
}

const RadialGraph: React.FC<RadialGraphProps> = ({ values }) => {
    const ref = useRef<SVGSVGElement>(null);
    const legendRef = useRef<SVGSVGElement>(null);
    const { t } = useTranslation();
    const { defaultLanguage } = useLanguage();

    const data = values.map((value) => value.reservationsRate);

    useEffect(() => {
        if (data.length) {
            drawRadialGraph();
        }
        // eslint-disable-next-line
    }, [data, defaultLanguage]);

    const width = 300;
    const height = 295;

    const drawRadialGraph = () => {
        const svg = d3.select(ref.current);

        const svgLegend = d3.select(legendRef.current);

        svg.selectAll("*").remove();
        svgLegend.selectAll("*").remove();

        const radius = Math.min(width, height) / 2;

        const total = d3.sum(data); // Suma total de los datos
        let runningTotal = 0; // Acumulador para calcular el ángulo de inicio

        const angleScale = d3.scaleLinear()
            .domain([0, total])
            .range([0, 2 * Math.PI]);

        const colorArray = [
            '#2B9E63',
            '#2B9E9D',
            '#2B669E',
            '#2B2D9E',
            '#632B9E',
            '#9D2B9E',
            '#9E2B66',
            '#9E9D2B',
            '#9E642B',
            '#9E2B2C',
            '#9E9D2B',
            '#123D40',
            '#5C9A9D',
        ];

        const colorScale = (index: number) => {
            return colorArray[index];
        };

        const group = svg.append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const legend = svgLegend.append("g")
            .selectAll(".legend")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(0, ${i * 25})`)
            .style("fill", "var(--ion-color-dark)");

        legend.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", (d, i) => colorScale(i));

        legend.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .style("font-size", "12px")
            .style("alignment-baseline", "middle")
            .text((d, i) => t("CATEGORY." + values[i].category.toUpperCase()));


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

    return <div style={{ minWidth: "425px" }}>
        <svg ref={legendRef} width={125} height={"100%"}></svg>
        <svg preserveAspectRatio="xMidYMid meet"
            ref={ref} width={width} height={height}>
        </svg>
    </div>;
};

export default RadialGraph;
