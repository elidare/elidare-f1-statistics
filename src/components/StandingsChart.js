import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './StandingsChart.css';

const Chart = ({ data }) => {
    const svgRef = useRef();
    const tooltipRef = useRef();

    const margin = { top: 80, right: 20, bottom: 20, left: 150 };
    const width = 800 - margin.left - margin.right;
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

        const tooltip = d3.select(tooltipRef.current).attr("class", "tooltip");

        // Create scales
        const xScalePoints = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.points)]) // Domain from 0 to max value
            .range([0, width]);

        const xScaleWins = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.wins)]) // Domain from 0 to max value
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

        // Add bars for points
        chart
            .selectAll(".bar-points")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar-points")
            .attr("y", (d) => yScale(d.driver))
            .attr("height", yScale.bandwidth() / 2)
            .attr("x", 0)
            .attr("width", (d) => xScalePoints(d.points))
            .on("mouseover", function(event, d) {
                tooltip.style("opacity", 1) // Make the tooltip visible
                    .html(d.points > 1 ? `${d.points} points` : `${d.points} point`);
            })
            .on("mousemove", (event) => {
                tooltip.style("top", `${event.pageY - fixTop + adaptTooltip}px`) // Magic number
                    .style("left", `${event.pageX - fixLeft + adaptTooltip}px`);
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0); // Hide the tooltip
            });
        
        // Add bars for wins
        chart
            .selectAll(".bar-wins")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar-wins")
            .attr("y", (d) => (yScale(d.driver) + yScale.bandwidth() / 2))
            .attr("height", yScale.bandwidth() / 2)
            .attr("x", 0)
            .attr("width", (d) => xScaleWins(d.wins))
            .on("mouseover", function(event, d) {
                tooltip.style("opacity", 1) // Make the tooltip visible
                    .html(d.wins > 1 ? `${d.wins} wins` : `${d.wins} win`);
            })
            .on("mousemove", (event) => {
                tooltip.style("top", `${event.pageY - fixTop + adaptTooltip}px`) // Magic number
                    .style("left", `${event.pageX - fixLeft + adaptTooltip}px`);
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0); // Hide the tooltip
            });

        // Add x-axis
        chart
            .append("g")
            .attr("class", "scale-points")
            .attr("transform", `translate(0, -20)`)
            .call(d3.axisTop(xScalePoints).ticks(5));

        // Add second x-axis
        chart
            .append("g")
            .attr("class", "scale-wins")
            .call(d3.axisTop(xScaleWins).ticks(5));

        // X Axis Legends
        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("x", (width - margin.left - margin.right) / 2 + margin.left)
            .attr("y", margin.top / 2) // Position below x-axis
            .text("Season points and wins");

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
