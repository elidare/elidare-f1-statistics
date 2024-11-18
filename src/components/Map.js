import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import worldData from '../assets/countries-110m.json';

const WorldMap = ({ points }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const map_width = 1000;
  const map_height = 645;

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

    // Set up projection and path
    // The geoMercator projection is commonly used for world maps, but you can experiment with others like geoEquirectangular 
    // depending on your needs.
    // Adjust the scale and translation to fit your SVG dimensions.
    const projection = d3.geoMercator().scale(150).translate([map_width / 2, map_height / 1.5]);
    const path = d3.geoPath().projection(projection);

    // Create a group for the map and points, which will be zoomed
    const g = svg.append("g");

    // Draw map
    g
        .append("g")
        .selectAll("path")
        .data(topojson.feature(worldData, worldData.objects.countries).features)
        .join("path")
        .attr("d", path)
        .attr("fill", "rgba(159, 232, 252, 0.6)")
        .attr("stroke", "rgba(109, 182, 202, 0.8)");

    const tooltip = d3.select(tooltipRef.current)
        .style("position", "absolute")
        .style("padding", "5px")
        .style("background", "rgba(0, 0, 0, 0.7)")
        .style("color", "white")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);

    if (points) {
        // Draw points
        g
          .append("g")
          .selectAll("g")
          .data(points)
          .join("g")
          .attr("transform", d => `translate(${projection([d.long, d.lat])[0]}, ${projection([d.long, d.lat])[1]})`)
          .each(function (d) {
              const group = d3.select(this);

              group.append("circle")
                .attr("r", 15)
                .attr("fill", "rgba(9, 82, 102, 0)") // Transparent fill, otherwise tooltip was disappearing in the middle of a circle
                .attr("stroke", "rgba(9, 82, 102, 1)")
                .on("mouseover", function() {
                    d3.select(this) // 'this' refers to the current circle
                        .attr("fill", "rgba(9, 82, 102, 0.4)"); // Change the fill color on hover
                })
                .on("mouseout", function() {
                    d3.select(this) // 'this' refers to the current circle
                        .attr("fill", "rgba(9, 82, 102, 0)"); // Reset the fill color when mouse leaves
                });;

              group.append("circle")
                .attr("r", 3)
                .attr("fill", "rgba(9, 82, 102, 1)");
          })
          // Add event listeners to display the tooltip
          .on("mouseover", function(event, d) {
              tooltip.style("opacity", 1) // Make the tooltip visible
                  .html(`${d.name}, ${d.country}`);
          })
          .on("mousemove", (event) => {
              tooltip.style("top", `${event.pageY - fixTop + adaptTooltip}px`) // Magic number
                  .style("left", `${event.pageX - fixLeft + adaptTooltip}px`);
          })
          .on("mouseout", () => {
              tooltip.style("opacity", 0); // Hide the tooltip
          });
    }

    // Define zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 6]) // Set zoom limits
        .on("zoom", (event) => {
            const { x, y, k } = event.transform;
            g.attr("transform", `translate(${x}, ${y}) scale(${k})`); // Apply zoom transform to the group
        });

    // Apply zoom behavior to the SVG
    svg.call(zoom);
  }, [points]);

  return (
    <div style={{ position: 'relative' }}>
      <svg ref={svgRef} width={map_width} height={map_height}></svg>
      <div ref={tooltipRef} style={{ position: 'absolute', pointerEvents: 'none' }}></div>
    </div>
  );
};

export default WorldMap;