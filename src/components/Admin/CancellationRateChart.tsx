import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface CancellationData {
    period: string; // podría ser una fecha como '2021-01', '2021-02', etc.
    reservations: number;
    cancellations: number;
}

interface CancellationRateChartProps {
    data: CancellationData[];
    width?: number;
    height?: number;
}

export const CancellationRateChart: React.FC<CancellationRateChartProps> = ({ data, width = 600, height = 400 }) => {
    const ref = useRef<SVGSVGElement>(null);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const widthPref = width - margin.left - margin.right;
    const heightPref = height - margin.top - margin.bottom;

    useEffect(() => {
        if (data.length) {
            drawBarChart();
        }
    }, [data]);

    const drawBarChart = () => {
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // Limpiar antes de dibujar

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleBand()
            .rangeRound([0, widthPref])
            .padding(0.1)
            .domain(data.map(d => d.period.toString()));

        const yScale = d3.scaleLinear()
            .rangeRound([heightPref, 0])
            .domain([0, Number(d3.max(data, d => d.cancellations/d.reservations*100))]);

        g.append("g")
            .attr("transform", `translate(0, ${heightPref})`)
            .call(d3.axisBottom(xScale).tickFormat(i => data.length <= 15 ? `Día ${i}` : i));

        g.append("g")
            .call(d3.axisLeft(yScale));

        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.period.toString())!)
            .attr("y", d => yScale(d.cancellations/d.reservations*100))
            .attr("width", xScale.bandwidth())
            .attr("height", d => heightPref - yScale(d.cancellations/d.reservations*100))
            .attr("fill", "#ff6361");
    };
        return <svg ref={ref} width={widthPref + margin.left + margin.right} height={heightPref + margin.top + margin.bottom}></svg>;

};

export default CancellationRateChart;
