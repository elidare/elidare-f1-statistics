import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
    const svgRef = useRef();
    const tooltipRef = useRef();

    const margin = { top: 20, right: 30, bottom: 40, left: 100 };
    const width = 500 - margin.left - margin.right;
    const height = data.length * 40 - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const svgElement = svg.node();
        let fixTop = 0;
        let fixLeft = 0;
        const adaptTooltip = 10; // Move tooltip this amount of px away from mouse

        if (svgElement) {
            const position = svgElement.getBoundingClientRect();
            fixTop = position.top;
            fixLeft = position.left;
        }

        // Clear previous SVG contents
        svg.selectAll("*").remove();

        svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        // Create scales
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.points)]) // Domain from 0 to max value
            .range([0, width]);

        const yScale = d3
            .scaleBand()
            .domain(data.map((d) => d.driver)) // Map names to bands
            .range([0, height])
            .padding(0.1);

        // Append a group element for the chart
        const chart = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add bars
        chart
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", (d) => yScale(d.driver))
            .attr("height", yScale.bandwidth())
            .attr("x", 0)
            .attr("width", (d) => xScale(d.points))
            .attr("fill", "steelblue");

        // Add x-axis
        chart
            .append("g")
            .call(d3.axisBottom(xScale).ticks(5))
            .attr("transform", `translate(0, ${height})`);

        // Add y-axis
        chart.append("g").call(d3.axisLeft(yScale));
    }, [data]);

    return (
        <div style={{ position: 'relative' }}>
          <svg ref={svgRef}></svg>
          <div ref={tooltipRef} style={{ position: 'absolute', pointerEvents: 'none' }}></div>
        </div>
      );
};
export default Chart;
