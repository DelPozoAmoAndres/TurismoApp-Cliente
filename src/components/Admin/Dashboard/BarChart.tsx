import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';

interface BarChartProps {
    data: { day: number; sales: number; }[];
    height?: number;
    width?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, height, width }) => {
    const ref = useRef<SVGSVGElement>(null);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const widthPref = (width != undefined ? width : 600) - margin.left - margin.right;
    const heightPref = (height != undefined ? height : 316) - margin.top - margin.bottom;
    const { t } = useTranslation();

    useEffect(() => {
        if (data.length) {
            drawBarChart();
        }
        // eslint-disable-next-line
    }, [data]);

    const drawBarChart = () => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // Limpiar antes de dibujar

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleBand()
            .rangeRound([0, widthPref])
            .padding(0.1)
            .domain(data.map(d => d.day.toString()));

        const yScale = d3.scaleLinear()
            .rangeRound([heightPref, 0])
            .domain([0, Number(d3.max(data, d => d.sales))]);

        g.append("g")
            .attr("transform", `translate(0, ${heightPref})`)
            .call(d3.axisBottom(xScale).tickFormat(i => data.length <= 15 ? t('DAY') + i : i));

        g.append("g")
            .call(d3.axisLeft(yScale));

        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.day.toString()) ?? 0)
            .attr("y", d => yScale(d.sales))
            .attr("width", xScale.bandwidth())
            .attr("height", d => heightPref - yScale(d.sales))
            .attr("fill", "var(--ion-color-secondary)");
    };

    return <svg ref={ref} width={widthPref + margin.left + margin.right} height={heightPref + margin.top + margin.bottom}></svg>;
};

export default BarChart;
